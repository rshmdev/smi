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

  try {
    const demand = await getItemById(id);
    const items = JSON.parse(demand.itens);

    const updatedItem = updatedItems.items;

    const somaTotalProd = items.reduce(
      (acc, item) => acc + parseInt(item.total_prod, 10),
      0
    );
    const somaTons = items.reduce(
      (acc, item) => acc + parseInt(item.tons, 10),
      0
    );
    // Obter os SKUs únicos
    const uniqueSkus = new Set(items.map((item) => item.sku));
    const totalUniqueSkus = uniqueSkus.size;

    // Atualizar no banco de dados
    await db.run(
      `UPDATE demands SET skus = ?, total_prod = ?, total_plan = ? WHERE id = ?`,
      [totalUniqueSkus, somaTotalProd, somaTons, id]
    );

    await db.run("UPDATE demands SET itens = ? WHERE id = ?", [
      JSON.stringify(updatedItem),
      id,
    ]);

    return await getItemById(id);
  } finally {
    await db.close();
  }
};

export const deleteItem = async (id) => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.run("DELETE FROM demands WHERE id = ?", [id]);
  return await getItemById(id);
};
