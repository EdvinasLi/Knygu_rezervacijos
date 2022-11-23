import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Books = () => {
    const [books, setBooks] = useState([])
    const [sort, setSort] = useState('')
    const { setAlert, userInfo } = useContext(MainContext)

    useEffect(() => {
        let url = '/api/books/'

        if (sort == '1' || sort == '2')
            url += '?sort=' + sort

        console.log(url)

        axios.get(url)
            .then(resp => setBooks(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [sort])

    return (
        <>
            <h1>Mūsų turimos knygos</h1>
            <select onChange={(e) => setSort(e.target.value)}>
                <option>Pagal ID</option>
                <option value="1">Pagal pavadinimą A-Ž</option>
                <option value="2">Pagal pavadinimą Ž-A</option>
            </select>
            {books && books.map(book =>
                <div key={book.id} style={{ marginBottom: 30, borderBottom: '3px solid black' }} className="bookCard">
                    <div><strong>{book.title}</strong></div>
                    <div>{book.category}</div>
                    <div>{book.author}</div>
                    <div><img src={book.photo} alt={book.id} /></div>
                    <div>
                        <Link
                            to={userInfo.id ? '/new-order/' + book.id : '/login'}
                            className="btn btn-primary"
                        >
                            Rezervuoti knygą
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Books