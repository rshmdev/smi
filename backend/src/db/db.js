import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const getItems = async () => {
  try {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
    return await db.all("SELECT * FROM demands");
  } catch (error) {
    throw new Error("Erro ao obter itens do banco de dados.");
  }
};

export const createItem = async (item) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const { name, final_date, initial_date, total_prod, fields } = item;

  const uniqueSkus = new Set(fields.map((field) => field.sku));

  const numSkus = uniqueSkus.size;

  const totalPlans = fields.reduce(
    (acc, field) => acc + parseInt(field.tons || 0, 10),
    0
  );

  const totalProd = total_prod ? total_prod : 0;

  const fieldsWithTotalProd = fields.map((item) => ({
    ...item,
    total_prod: totalProd,
  }));

  try {
    const result = await db.run(
      "INSERT INTO demands (initial_date, final_date, skus, total_plan, total_prod, itens, name) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        final_date,
        initial_date,
        numSkus,
        totalPlans,
        totalProd,
        JSON.stringify(fieldsWithTotalProd),
        name,
      ]
    );

    return await getItemById(result.lastID);
  } catch (error) {
    throw error;
  }
};

export const getItemById = async (id) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const query = "SELECT * FROM demands WHERE id = ?";
  const result = await db.get(query, [id]);

  return result;
};

export const updateItem = async (id, updatedItems) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const demand = await getItemById(id); // Obtém a demanda atual
  const items = JSON.parse(demand.itens);

  const newItems = items.map((existingItem) => {
    const updatedItem = updatedItems.itens.find(
      (item) => item.id === existingItem.id
    );
    if (updatedItem) {
      return {
        ...existingItem,
        tons: updatedItem.tons,
        total_prod: updatedItem.total_prod,
      };
    } else {
      return existingItem;
    }
  });

  let somaTotalProd = 0;

  newItems.forEach((item) => {
    somaTotalProd += parseInt(item.total_prod, 10); // Converte para número e soma
  });

  let somaTons = 0;

  items.forEach((item) => {
    somaTons += parseInt(item.tons, 10); // Converte para número e soma
  });

  const uniqueSkus = new Set();

  items.forEach((item) => {
    uniqueSkus.add(item.sku);
  });

  const totalUniqueSkus = uniqueSkus.size;

  await db.run(
    `UPDATE demands SET skus= ${totalUniqueSkus}, total_prod = ${somaTotalProd}, total_plan = ${somaTons} WHERE id = ${id}`
  );

  await db.run("UPDATE demands SET itens = ? WHERE id = ?", [
    JSON.stringify(newItems),
    id,
  ]);

  return await getItemById(id);
};

export const deleteItem = async (id) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
  await db.run("DELETE FROM demands WHERE id = ?", [id]);
  return await getItemById(id);
};

export const deleteDemandItem = async (id, itemId) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const currentItem = await db.get("SELECT * FROM demands WHERE id = ?", [id]);

  const currentItems = JSON.parse(currentItem.itens);

  const updatedItemsArray = currentItems.filter((item) => item.id !== itemId);

  await db.run("UPDATE demands SET itens = ? WHERE id = ?", [
    JSON.stringify(updatedItemsArray),
    id,
  ]);
};
