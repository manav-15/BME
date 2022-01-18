module.exports = (sequelize, Sequelize) => {
    const UserEvent = sequelize.define("userEvent", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }
    });

    return UserEvent;
};