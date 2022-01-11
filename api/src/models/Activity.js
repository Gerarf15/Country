const { DataTypes } = require("sequelize");
const SEASON = {
  SUMMER: "Verano",
  AUTUMN: "Otoño",
  WINTER: "Invierno",
  SPRING: "Primavera",
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