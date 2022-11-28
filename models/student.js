module.exports = (sequelize, DataTypes) => {

    // creating student object-- describes how student object is structured
    // & how the student table in the database will be structured
    let Student = sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    })

    // force--(whether to drop a table or not)
    // true = drop table every time app restarts. Needed if table schema changed
    // false = keep table
    Student.sync( {force: false} ).then( () => {
        console.log('Synced student table ')
    })

    return Student

}