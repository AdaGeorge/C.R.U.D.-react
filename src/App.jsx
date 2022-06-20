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

       <div className='user-card-container'>
       {userList}
       </div>

       <article className='info'>
         <h2>Peticiones HTTP con axios y uso de C.R.U.D</h2>

         <p>Axios es una API HTTP de cliente basada en XMLHttpRequest, que se puede utilizar en el navegador y en un servidor con Node.js. Axios funciona de forma asíncrona, permitiendo realizar con retorno JSON. Además es uno de los clientes más populares basado en promesas, que es simple, liviano y muy fácil de personalizar.</p>

         <h3>En este proyecto veremos en acción los métodos CRUD</h3>

         <p>El concepto CRUD está estrechamente vinculado a la gestión de datos digitales. CRUD hace referencia a un acrónimo en el que se reúnen las primeras letras de las cuatro operaciones fundamentales de aplicaciones persistentes en sistemas de bases de datos:</p>
        
         <ul>
           <li>Create (Crear registros)</li>
           <li>Read or Retrieve (Leer registros)</li>
           <li>Update (Actualizar registros)</li>
           <li>Delete or Destroy (Borrar registros)</li>
         </ul>
        
         <p>En pocas palabras, CRUD resume las funciones requeridas por un usuario para crear y gestionar datos en una base de datos.</p>
       </article>

      </main>
      <footer>
        <a href="https://github.com/AdaGeorge/C.R.U.D.-react"><FaGithub className='github-icon'/></a>
      </footer>
    </div>
  )
}

export default App
