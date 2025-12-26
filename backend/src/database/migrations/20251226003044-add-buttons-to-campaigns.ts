import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.addColumn("Campaigns", "interactiveButtons", {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn("Campaigns", "messageTitle", {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn("Campaigns", "messageSubtitle", {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn("Campaigns", "messageFooter", {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      })
    ]);
  },

  down: (queryInterface: QueryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("Campaigns", "interactiveButtons"),
      queryInterface.removeColumn("Campaigns", "messageTitle"),
      queryInterface.removeColumn("Campaigns", "messageSubtitle"),
      queryInterface.removeColumn("Campaigns", "messageFooter")
    ]);
  }
};
