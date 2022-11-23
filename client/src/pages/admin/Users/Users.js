import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../../context/MainContext'
import defaultImage from '../../../resources/default.jpg'

const Workers = () => {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const { setAlert } = useContext(MainContext)

    const handleDelete = (id) => {
        axios.delete('/api/users/delete/' + id)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                setRefresh(!refresh)

                window.scrollTo(0, 0)
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
        axios.get('/api/users/')
            .then(resp => setUsers(resp.data))
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }, [refresh, setAlert])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center page-heading">
                <h1>Registruoti vartotojai šiame puslapyje</h1>

            </div>
            {users ?
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nuotrauka</th>
                            <th>Vardas</th>
                            <th>Pavardė</th>
                            <th>Statusas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    {user.photo ?
                                        <img
                                            src={user.photo}
                                            alt={user.first_name + ' ' + user.last_name}
                                            style={{ maxWidth: '80px' }}
                                        />
                                        :
                                        <img
                                            src={defaultImage}
                                            alt="none"
                                            style={{
                                                opacity: 0.5,
                                                maxWidth: '80px'
                                            }}
                                        />
                                    }
                                </td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.role === 1 ? 'Administratorius' : 'Vartotojas'}</td>

                                <td>
                                    <div className="d-flex justify-content-end gap-2">
                                        <Link to={'/admin/users/edit/' + user.id} className="btn btn-primary">Redaguoti</Link>
                                        <button className="btn btn-warning" onClick={() => handleDelete(user.id)}>Ištrinti</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <h3>Nėra registruotų vartotojų</h3>
            }
        </>
    )
}

export default Workers