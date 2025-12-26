import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("Webhooks", "company_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("Webhooks", "company_id");
  }
};
