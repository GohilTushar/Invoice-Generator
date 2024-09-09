import express from "express";
const router = express.Router();

import { getInvoice, createInvoice, updateInvoice, invoiceList, deleteInvoice } from "../controller/invoice.controller.js";

router.route("/create").post(createInvoice);
router.route("/get/:id").get(getInvoice);
router.route("/get").get(invoiceList);
router.route("/update/:id").put(updateInvoice);
router.route("/delete/:id").delete(deleteInvoice);

export default router;
