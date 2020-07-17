import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { CodeGen } from "swagger-typescript-codegen";

import { swaggerSpec } from "./swagger-ui";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import db from "./models";

export default (): void => {
  db.sequelize.sync({ alter: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const codeGenApi = CodeGen.getTypescriptCode({ swagger: swaggerSpec as any });
  fs.writeFile("api.ts", codeGenApi, err => err && console.error(err));
};
