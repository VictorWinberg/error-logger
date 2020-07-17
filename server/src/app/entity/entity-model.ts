import { DataTypes } from "sequelize";

/**
 * @swagger
 * definitions:
 *   Entity:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       error:
 *         $ref: "#/definitions/Error"
 *       browser:
 *         type: string
 *       browser_version:
 *         type: string
 *       platform:
 *         type: string
 *       platform_version:
 *         type: string
 *       location:
 *         type: string
 */
export default (sequelize: any) => {
  const Entity = sequelize.define(
    "Entity",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      browser: DataTypes.STRING,
      browserVersion: DataTypes.STRING,
      platform: DataTypes.STRING,
      platformVersion: DataTypes.STRING,
      location: DataTypes.STRING
    },
    {}
  );
  Entity.associate = function(models: any): void {
    Entity.belongsTo(models.Error, {});
  };
  return Entity;
};
