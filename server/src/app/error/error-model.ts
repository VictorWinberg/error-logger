import { DataTypes } from "sequelize";

/**
 * @swagger
 * definitions:
 *   Error:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       type:
 *         type: string
 *       stacktrace:
 *         type: string
 *       project:
 *         $ref: "#/definitions/Project"
 */
export default (sequelize: any) => {
  const Error = sequelize.define(
    "Error",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      type: DataTypes.STRING,
      stacktrace: DataTypes.TEXT
    },
    {}
  );
  Error.associate = function(models: any) {
    Error.belongsTo(models.Project, {});
  };
  return Error;
};
