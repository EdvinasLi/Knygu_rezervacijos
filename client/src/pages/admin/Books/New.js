import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'

const NewSaloon = () => {
    const { setAlert } = useContext(MainContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        author: '',
        photo: '',
    })

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/books/new', form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                navigate('/admin')
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

    return (
        <>
            <div className="container mw-50">
                <div className="page-heading">
                    <h1>Pridėkite naują knygą</h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-2">
                        <label className="mb-1">Pavadinimas:</label>
                        <input type="text" name="title" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Kategorija:</label>
                        <input type="text" name="category" className="form-control" onChange={handleForm} />
                    </div>

                    <div className="form-group mb-2">
                        <label className="mb-1">Aprašymas:</label>
                        <input type="text" name="description" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Autorius:</label>
                        <input type="text" name="author" className="form-control" onChange={handleForm} />
                    </div>
                    <div className="form-group mb-2">
                        <label className="mb-1">Nuotrauka:</label>
                        <input type="file" name="photo" className="form-control" onChange={handleForm} />
                    </div>
                    <button className="btn btn-primary">Siųsti</button>
                </form>
            </div>
        </>
    )
}

export default NewSaloon