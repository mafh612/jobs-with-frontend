import React from 'react'
import { client } from '../utils/client'
import { Payload } from '../../shared'

interface NavigationProps {
  auth: undefined | Payload
}

export const NavigationElement = ({ auth }: NavigationProps) => {
  const logout = () => {
    client.get('/auth/logout')
    window.location.reload()
  }

  return auth && auth?.role ? (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Jobs</span>
        {auth && (
          <span className='navbar-brand'>
            {auth.sub} in as {auth.role}
          </span>
        )}
        <div className='d-flex justify-content-end navbar-nav'>
          <div className='nav-item'>
            <button onClick={logout} className='btn btn-secondary text-white nav-link'>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <p></p>
  )
}
