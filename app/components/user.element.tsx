import React from 'react'
import { User } from '../../shared/interfaces'

interface UserProps extends User {
  handleSelectUser(user: User): void
}

export const UserElement = (_props: UserProps) => {
  return <div>UserElement</div>
}
