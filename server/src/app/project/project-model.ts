import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING
    },
    {}
  );
  Project.associate = function(models: any) {};
  return Project;
};
