import React, { ChangeEvent, ChangeEventHandler, Dispatch, MouseEvent, SetStateAction, useState } from 'react'

import { Role, User } from '../../shared'
import { client } from '../utils/client'

interface InputUserProps {}

export const InputUserElement = (_props: InputUserProps) => {
  const [user, setUser]: [User, Dispatch<SetStateAction<User>>] = useState({}) as unknown as [User, Dispatch<SetStateAction<User>>]
  const handleInput: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.currentTarget.id]: event.currentTarget.value })
  }
  const setUserRole = (event: MouseEvent<HTMLButtonElement>) => {
    setUser({ ...user, role: event.currentTarget.value as Role })
  }
  const active = (value: string) => (value === user.role ? 'btn-primary' : 'btn-secondary')
  const register = () => {
    client.post('/auth/register', user).then(() => {
      window.location.reload()
    })
  }
  const disabled = () => !Boolean(user && user.email !== '' && user.firstname && user.lastname && user.password && user.role)

  return (
    <div id='InputUserModal' className='modal' tabIndex={-1}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Modal title</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <div>
              <div className='input-group mb-3'>
                <span className='input-group-text w-25' id='basic-addon1'>
                  firstname
                </span>
                <input className='form-control' id='firstname' onChange={handleInput} value={user.firstname} />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text w-25' id='basic-addon1'>
                  lastname
                </span>
                <input className='form-control' id='lastname' onChange={handleInput} value={user.lastname} />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text w-25' id='basic-addon1'>
                  email
                </span>
                <input className='form-control' id='email' onChange={handleInput} value={user.email} />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text w-25' id='basic-addon1'>
                  password
                </span>
                <input className='form-control' id='password' onChange={handleInput} value={user.password} />
              </div>
              <div className='input-group mb-3'>
                <button value='employer' className={`btn ${active('employer')}`} onClick={setUserRole}>
                  Employer
                </button>
                <button value='employee' className={`btn ${active('employee')}`} onClick={setUserRole}>
                  Employee
                </button>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
              Close
            </button>
            <button onClick={register} disabled={disabled()} type='button' className='btn btn-primary'>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
