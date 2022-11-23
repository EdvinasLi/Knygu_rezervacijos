import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const EditBook = () => {
    const { setAlert } = useContext(MainContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        author: '',
        photo: '',
    })

    const [books, setBooks] = useState([])

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }

        axios.put('/api/books/edit/' + id, formData)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin/')
            })
            .catch(error => {
                console.log(error)

                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    navigate('/login')
            })
    }

    useEffect(() => {
        axios.get('/api/books/single/' + id)
            .then(resp => setForm(resp.data))
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [id, setAlert])

    useEffect(() => {
        axios.get('/api/books/')
            .then(resp => setBooks(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [setAlert])

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Knygos redagavimas</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Pavadinimas:</label>
                        <input type="text" name="title" className="form-control" onChange={handleForm} value={form.title} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Kategorija:</label>
                        <input type="text" name="category" className="form-control" onChange={handleForm} value={form.category} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Aprašymas:</label>
                        <input type="text" name="description" className="form-control" onChange={handleForm} value={form.description} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Autorius:</label>
                        <input type="text" name="author" className="form-control" onChange={handleForm} value={form.author} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Nuotrauka:</label>
                        <input type="file" name="photo" className="form-control" onChange={handleForm} />
                    </div>
                    {form.photo && typeof form.photo === 'string' &&
                        <div className="mb-2">
                            <img src={form.photo} alt="" style={{ maxWidth: 200 }} />
                            <div>
                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={(e) => {
                                        setForm({ ...form, photo: '' })
                                    }}
                                >
                                    Ištrinti nuotrauką
                                </button>
                            </div>
                        </div>
                    }

                    <button className="btn btn-primary">Išsaugoti</button>
                </form>
            </div>
        </>
    )
}

export default EditBook