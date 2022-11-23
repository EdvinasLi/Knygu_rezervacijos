import { DataTypes } from 'sequelize'

const Reservation = (sequelize) => {
    const Schema = {
        reservation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }

    return sequelize.define('reservation', Schema)
}

export default Reservation