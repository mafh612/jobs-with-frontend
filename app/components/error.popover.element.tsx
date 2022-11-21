import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { subscribe, unsubscribe } from '../utils/state'

export const ErrorPopoverElement = () => {
  const [error, setError]: [undefined | Error, Dispatch<SetStateAction<undefined | Error>>] = useState()
  useEffect(() => {
    subscribe('ErrorPopover_errorHandling', async (errorResponse: Response) => {
      errorResponse?.json &&
        errorResponse?.json().then((err: Error) => {
          setError(err)
        })
      setTimeout(() => {
        setError(undefined)
      }, 1000)
    })

    return function cleanUp() {
      unsubscribe('ErrorPopover_errorHandling')
    }
  }, [])
  const handleClose = () => {
    setError(undefined)
  }

  return error?.message ? (
    <div className='toast-container position-static'>
      <div className='toast show m-5' role='alert'>
        <div className='toast-header'>
          <strong className='me-auto'>{error?.name}</strong>
          <small>{error?.message}</small>
          <button type='button' className='btn-close' onClick={handleClose} data-bs-dismiss='toast'></button>
        </div>
        <div className='toast-body'>{error?.message}</div>
      </div>
    </div>
  ) : (
    <span></span>
  )
}
