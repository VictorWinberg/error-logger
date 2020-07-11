import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import db from "./models";

export default () => db.sequelize.sync({ alter: true });
