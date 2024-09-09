import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
// import Invoice from "./invoice.model.js";

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Item.belongsTo(Invoice, {
//   foreignKey: "invoiceId",
//   onDelete: "CASCADE",
// });

export default Item;


// import { DataTypes } from "sequelize";
// import sequelize from "../database/db.js";
// import Item from "./item.model.js";
// import Invoice from "./invoice.model.js";

// const Pivot = sequelize.define(
//   "Invoice",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//     },
//     itemId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Item,
//         key: "id",
//       },
//       allowNull: false,
//     },
//     invoiceId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Invoice,
//         key: "id",
//       },
//       allowNull: false,
//     },
// },
//   {
//     timestamps: true,
//   }
// );

// Pivot.belongsTo(Item,{
//   foreignKey: "itemId",
//   onDelete: "CASCADE",
//   as: "item",
// })
// Pivot.belongsTo(Invoice,{
//   foreignKey: "invoiceId",
//   onDelete: "CASCADE",
//   as: "invoice",
// })

// export default Pivot;
