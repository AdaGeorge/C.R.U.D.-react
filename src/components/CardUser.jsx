import axios from 'axios';
import React from 'react'
import { FaRegUserCircle, FaTrash, FaPen } from 'react-icons/fa';

const CardUser = ({ user, URL, getAllUsers, setShowForm, setObjectUpdate, reset }) => {

  const deleteUser = ()=>{
    axios.delete(`${URL}${user.id}/`)
    .then((res)=>{
      console.log(res.data)
      getAllUsers()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const updateUserData = () =>{
    setShowForm(true)

    const obj = {
      email: user.email,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      birthday: user.birthday
    }

    reset(obj)
    setObjectUpdate(user)
  }

  return (
    <div className='card-user'>
      <FaRegUserCircle className='user-icon'/>
        <h2>{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
        <p>{user.birthday}</p>
        <button className='btn-card' onClick={deleteUser}><FaTrash/></button>
        <button className='btn-card' onClick={updateUserData}> <FaPen/> </button>
    </div>
  )
}

export default CardUser