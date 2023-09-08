module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Address;
};

