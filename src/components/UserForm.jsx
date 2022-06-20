import React from 'react'
import {FaBirthdayCake} from 'react-icons/fa'
import {FiUpload} from 'react-icons/fi'



const UserForm = ({createNewUser, handleSubmit, reset, register, updateUser, objectUpdate }) => {


  const obj ={
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: ''
  }

  const submit = (data)=>{
    if(objectUpdate !== undefined){
      updateUser(objectUpdate.id, data)
   } else{
      createNewUser(data)
   }
    reset(obj)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='card-form'>
        <div>
          <label htmlFor="first_name">First Name: </label>
          <input className='input-form' type="text" id='first_name' {...register('first_name')}/>
        </div>
        <div>
          <label htmlFor="last_name">Last Name: </label>
          <input className='input-form' type="text" id='last_name' {...register('last_name')}/>
        </div>
        <div>
         <label htmlFor="birthday"> <FaBirthdayCake/> Birthday: </label>
         <input className='input-form' type="date" id='birthday' {...register('birthday')}/>
        </div>
        <div>
         <label htmlFor="email">Email: </label>
         <input className='input-form' type="email" id='email' {...register('email')}/>
        </div>
        <div> 
         <label htmlFor="password">Password: </label>
         <input className='input-form' type="password" id='password' {...register('password')}/>
        </div>

       <button className='btn-create-new'><FiUpload/></button>
    </form>
  )
}

export default UserForm