import express from "express";
const router = express.Router();

import { createItem, deleteItem, getItemByInvoice, itemList } from "../controller/item.controller.js";
import upload from "../middleware/upload.middleware.js";

router.route("/create").post(upload , createItem);
router.route("/delete/:id").delete(deleteItem);
router.route("/get").get(itemList);
router.route("/get/:id").get(getItemByInvoice);

export default router;
