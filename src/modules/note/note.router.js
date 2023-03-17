import { Router } from "express";
import * as noteController from "./controller/note.js";
const router = Router();

router.get("/", noteController.getNoteModule);
router.post("/", noteController.addNote);

export default router;
