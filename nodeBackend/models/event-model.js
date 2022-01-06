module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.BLOB('long')
        },
        organizer:{
            type: Sequelize.STRING,
            allowNull: false
        },
        startTime: {
            type: Sequelize.DATE,
            // allowNull: false
        },
        endTime: {
            type: Sequelize.DATE,
            // allowNull: false,
        }
    });
  
    return Event;
};  