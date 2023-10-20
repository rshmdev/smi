import { Router } from "express";
import {
  getAllDemands,
  CreateDemand,
  UpdateDemand,
  deleteDemand,
  getDemandById,
} from "./controllers/demands.js";

const router = Router();

router.get("/demands", getAllDemands);
router.post("/demands", CreateDemand);
router.put("/demands/:id", UpdateDemand);
router.get("/demands/:id", getDemandById);
router.delete("/demands/:id", deleteDemand);

export default router;
