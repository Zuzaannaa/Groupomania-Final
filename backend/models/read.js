"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Read extends Model {
    static associate(models) {
      Read.belongsTo(models.User, {
        onDelete: "cascade",
        foreignKey: { name: "userId", allowNull: false },
        hooks: true,
      });
      Read.belongsTo(models.Post, {
        onDelete: "cascade",
        foreignKey: { name: "postId", allowNull: false },
        hooks: true,
      });
    }
  }
  Read.init(
    {
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Read",
    }
  );
  return Read;
};
