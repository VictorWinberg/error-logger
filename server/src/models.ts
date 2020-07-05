import path from "path";
import { Sequelize } from "sequelize";
import readdirRec from "fs-readdir-recursive";

const db: any = {};

const _sequelize = new Sequelize(process.env.DATABASE_URL || "");

readdirRec(__dirname)
  .filter(f => f.includes("-model."))
  .forEach(file => {
    const model = _sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = _sequelize;

export default db;
