import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Payload, User } from '../../shared'
import { client } from '../utils/client'

interface AdminProps {
  auth?: Payload
}

export const Admin = (_props: AdminProps) => {
  const [users, setUsers]: [User[], Dispatch<SetStateAction<User[]>>] = useState() as [User[], Dispatch<SetStateAction<User[]>>]
  useEffect(() => {
    client.get('/api/users').then((response) => {
      setUsers(response)
    })
  }, [])
  return (
    <ul className='list-group list-group-flush'>
      {users &&
        users.map((it: User, key: number) => (
          <li className='list-group-item' key={`user_${key}`}>
            <div className='d-flex justify-content-between'>
              <span className='m-2'>{it.firstname}</span>
              <span className='m-2'>{it.lastname}</span>
              <span className='m-2'>{it.email}</span>
              <span className='m-2'>{it.role}</span>
              <span className='m-2'>{it.created?.toString()}</span>
              <span className='m-2'>{it.updated?.toString()}</span>
            </div>
          </li>
        ))}
    </ul>
  )
}
