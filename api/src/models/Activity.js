const { DataTypes } = require("sequelize");
const SEASON = {
  SUMMER: "summer",
  AUTUMN: "auntumn",
  WINTER: "winter",
  SPRING: "sprint",
};
module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.ENUM(
        SEASON.SUMMER,
        SEASON.AUTUMN,
        SEASON.WINTER,
        SEASON.SPRING
      ),
    },
  });
};