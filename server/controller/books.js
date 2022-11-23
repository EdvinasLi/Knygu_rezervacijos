import express from 'express'
import db from '../database/connect.js'
import { booksValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    const options = {}

    if (req.query.sort === '1') {
        options.order = [
            ['name', 'ASC']
        ]
    }

    if (req.query.sort === '2') {
        options.order = [
            ['name', 'DESC']
        ]
    }

    try {
        const books = await db.Books.findAll(options)
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', adminAuth, async (req, res) => {
    try {
        const books = await db.Books.findByPk(req.params.id)
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.post('/new', adminAuth, upload.single('photo'), booksValidator, async (req, res) => {
    try {
        if (req.file)
            req.body.photo = '/uploads/' + req.file.filename

        await db.Books.create(req.body)
        res.send('Knyga sėkmingai išsaugota')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', adminAuth, upload.single('photo'), booksValidator, async (req, res) => {
    try {
        if (req.file)
            req.body.photo = '/uploads/' + req.file.filename

        const book = await db.Books.findByPk(req.params.id)
        await book.update(req.body)
        res.send('Knyga sėkmingai atnaujinta')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        await book.destroy()
        res.send('Knyga sėkmingai ištrinta')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router