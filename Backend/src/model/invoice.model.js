import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Item from "./item.model.js";

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    billFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailFrom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    addressFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailTo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    addressTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Shipped", "Delivered"],
      allowNull: false,
    },
    finalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
},
  {
    timestamps: true,
  }
);

Invoice.hasMany(Item,{
  as:  "items",
  foreignKey: "invoiceId"
});


export default Invoice;
