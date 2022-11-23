import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { Users, Books, Reservation, Ratings, } from '../model/index.js'

const database = {}
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'knygos_egzaminas'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' })

    database.Users = Users(sequelize)
    database.Books = Books(sequelize)
    database.Reservation = Reservation(sequelize)
    database.Ratings = Ratings(sequelize)


    database.Books.hasOne(database.Reservation)
    database.Reservation.belongsTo(database.Books)

    database.Users.hasMany(database.Books)
    database.Books.belongsTo(database.Users)


    database.Books.hasOne(database.Ratings)
    database.Ratings.belongsTo(database.Books)

    await sequelize.sync({ alter: true })
} catch (error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database