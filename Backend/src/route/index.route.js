import express from "express";
const router = express.Router();

import invoice from "./invoice.route.js"
import item from "./item.route.js"

router.use("/invoice",invoice)
router.use("/item",item)

export default router;
