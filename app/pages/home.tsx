import React, { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react'

import { Login } from '../../shared'
import { InputUserElement } from '../components/input.user.element'
import { client } from '../utils/client'

interface HomeProps {}

export const Home = (_props: HomeProps) => {
  const newLogin: Login = {
    email: '',
    password: ''
  }
  const [loginData, setLoginData]: [Login, Dispatch<SetStateAction<Login>>] = useState(newLogin)
  const handleInput: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.currentTarget.id]: event.currentTarget.value })
  }
  const login = () => {
    client.post<{ logged_in: boolean }>('/auth/login', loginData).then((response) => {
      if (response?.logged_in) window.location.reload()
    })
  }

  return (
    <>
      <div className='container'>
        <div className='d-flex flex-row justify-content-center'>
          <div className='m-1 w-50'>
            <div className='input-group mb-3'>
              <span className='input-group-text w-25' id='basic-addon1'>
                email
              </span>
              <input className='form-control' id='email' onChange={handleInput} value={loginData.email} />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text w-25' id='basic-addon1'>
                password
              </span>
              <input className='form-control' id='password' type='password' onChange={handleInput} value={loginData.password} />
            </div>
            <div className='d-grid gap-3'>
              <button className='btn btn-primary' onClick={login}>
                Login
              </button>
              <button className='btn btn-primary' data-bs-target='#InputUserModal' data-bs-toggle='modal'>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <InputUserElement />
    </>
  )
}
