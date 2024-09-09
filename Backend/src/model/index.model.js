import sequelize from "../database/db.js";

(async function () {
  try {
    await sequelize.sync();
    console.log("Table created");
  } catch (error) {
    console.log("error in table creation", error);
  }
})();

export default sequelize;
