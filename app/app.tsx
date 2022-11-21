import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { Payload, Role } from '../shared'
import { ErrorPopoverElement } from './components/error.popover.element'
import { Home } from './pages/home'
import { NavigationElement } from './components/navigation.element'
import { Admin } from './pages/admin'
import { client } from './utils/client'
import { Employee } from './pages/employee'
import { Employer } from './pages/employer'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [auth, setAuth]: [undefined | Payload, Dispatch<SetStateAction<undefined | Payload>>] = useState(undefined) as any
  useEffect(() => {
    client.get('/auth/reflect').then(setAuth)
  }, [])

  const display = (payload: Payload) => {
    switch (payload?.role) {
      case Role.ADMIN:
        return <Admin auth={payload as Payload} />
      case Role.EMPLOYEE:
        return <Employee auth={payload as Payload} />
      case Role.EMPLOYER:
        return <Employer auth={payload as Payload} />
      default:
        return <Home />
    }
  }

  return (
    <>
      <NavigationElement auth={auth} />
      <div className='container'>{display(auth as Payload)}</div>
      <ErrorPopoverElement />
    </>
  )
}

const container = ReactDOM.createRoot(document.querySelector('#app') as Element)
container.render(<App />)
