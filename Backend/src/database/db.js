import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} from "../config/config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("connection success");
  } catch (err) {
    console.log("error in connection", err);
  }
})();

export default sequelize;
