module.exports = function (sequelize, DataTypes) {
  // makes a basic characters table in game database
  var Character = sequelize.define("Character", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stockChoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stockPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
   
    totalValue: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
    }
    
  });

  Character.associate = function (models) {
    Character.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Character;
};