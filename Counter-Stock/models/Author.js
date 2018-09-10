module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    username: {
      type: DataTypes.STRING,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Author.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };

  return Author;
};