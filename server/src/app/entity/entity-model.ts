import { DataTypes } from "sequelize";

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
  Entity.associate = function(models: any) {
    Entity.belongsTo(models.Error, {});
  };
  return Entity;
};
