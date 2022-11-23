import { DataTypes } from 'sequelize'

const Books = (sequelize) => {
    const Schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

    return sequelize.define('books', Schema)
}

export default Books