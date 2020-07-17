/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { CodeGen } from "swagger-typescript-codegen";

import { swaggerSpec } from "./swagger-ui";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import db from "./models";

export default (): void => {
  db.sequelize.sync({ alter: true });

  const codeGenApi =
    "/* eslint-disable */" +
    CodeGen.getTypescriptCode({
      className: "ApiService",
      swagger: swaggerSpec as any
    });
  const pathname = path.resolve(__dirname, "../../client/src/api.ts");
  fs.writeFile(pathname, codeGenApi, err => err && console.error(err));
};
