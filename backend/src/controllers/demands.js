import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
} from "../db/db.js";

export const getAllDemands = async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter demandas." });
  }
};

export const CreateDemand = async (req, res) => {
  try {
    const newItem = req.body;
    const createdItem = await createItem(newItem);

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar Demanda" });
  }
};

export const getDemandById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await getItemById(id);
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado." });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter o item por ID." });
  }
};

export const UpdateDemand = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedItem = req.body;
    const item = await updateItem(id, updatedItem);
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: "Item not found" });
  }
};

export const deleteDemand = (req, res) => {
  const id = req.params.id;
  const success = deleteItem(id);
  if (success) {
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};
