import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import CardUser from './components/CardUser'
import UserForm from './components/UserForm'
import './App.css'
import { FaGithub } from 'react-icons/fa'

//URL de la API
const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

  //estado del get, declaramos los usuarios
  const [users, setUsers] = useState()
  //Estado de el formulario que permite ocultarlo
  const [showForm, setShowForm] = useState(false)
  //Estado que retiene al usuario a cambiar con el post
  const [objectUpdate, setObjectUpdate] = useState()


  //useForm Hook para controlar el formulario
  const{register, handleSubmit, reset} = useForm()


  //get... llamamos info de la API
  const getAllUsers = ()=>{
    axios.get(URL)
    .then((res)=>{
      setUsers(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  //Al nacer el componente renderiza los usuarios
  useEffect(()=>{
    getAllUsers()
  }, [])

  //Post... create nuevo usuario
  const createNewUser = (data)=>{
    axios.post(URL, data)
    .then((res)=>{
      console.log(res.data)
      getAllUsers()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

// Patch.. update usuario
  const updateUser = (id, data)=>{

    axios.patch(`${URL}${id}/`, data)
    .then((res)=>{
      console.log(res.data)
      getAllUsers()
      setObjectUpdate()
      setShowForm(false)
    })
    .catch((err)=>{
      console.log(err)
    })

  }

//Funcion que cambia el estado del formulario
  const showFormFunc = ()=>{
    const obj = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: ''
    }
    reset(obj)
    setShowForm(!showForm)
  }


  //Mapeo de los usuarios, renderizamos el componente CardUser 
  let userList = users?.map(user => (
  <CardUser 
  user={user} 
  key={user.id} 
  URL={URL}
  getAllUsers={getAllUsers}
  setShowForm={setShowForm}
  setObjectUpdate={setObjectUpdate}
  reset={reset}
  />)
  )

  return (
    <div className="App">
      <header className='header'>
        
         <h1>Users</h1>

      </header>
      <main>

       <button className='btn-create-new' onClick={showFormFunc}>{showForm ? 'Hide Form': 'Create new user'}</button>

       <div className='form-container'>
       {
        showForm &&
        <UserForm
        createNewUser={createNewUser}
        objectUpdate={objectUpdate}
        updateUser={updateUser}
        handleSubmit={handleSubmit}
        reset={reset}
        register={register}
        />
       }
       </div>

       <div>

       {userList}

       </div>
      </main>
      <footer>
        <a href=""><FaGithub className='github-icon'/></a>
      </footer>
    </div>
  )
}

export default App
