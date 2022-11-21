import { WithId } from 'mongodb'
import React, { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Job, Payload } from '../../shared/interfaces'
import { client } from '../utils/client'
import { closeModal } from '../utils/handle.modals'

interface InputJobProps {
  inputJob?: undefined | Job | WithId<Job>
  auth: Payload
}

export const InputJobElement = ({ auth, inputJob }: InputJobProps) => {
  const [job, setJob]: [Job, Dispatch<SetStateAction<Job>>] = useState({
    description: '',
    employer: '',
    name: '',
    requirements: ''
  }) as [Job, Dispatch<SetStateAction<Job>>]
  useEffect(() => {
    if (!!inputJob) setJob(inputJob as Job)
  }, [inputJob])
  const save = () => {
    if (!!(inputJob as WithId<Job>)?._id) {
      client.patch(`/api/jobs/${(job as WithId<Job>)._id}`, job)
    } else {
      if (!job.employer) {
        job.employer = auth.jti as string
      }
      client.post('/api/jobs', job)
    }
    closeModal('InputJobModal')
  }
  const handleInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [event.currentTarget.id]: event.currentTarget.value })
  }
  const disabled = () => !Boolean(job && job.name !== '' && job.description && job.requirements)

  return (
    <>
      <div id='InputJobModal' className='modal' tabIndex={-1}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Modal title</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div>
                <div className='input-group m-2'>
                  <span className='input-group-text w-25' id='basic-addon1'>
                    job name
                  </span>
                  <input id='name' type='text' className='form-control' placeholder='name' value={job.name} onChange={handleInput} />
                </div>
                <div className='input-group m-2'>
                  <span className='input-group-text w-25'>job description</span>
                  <textarea
                    id='description'
                    className='form-control'
                    placeholder='description'
                    value={job.description}
                    onChange={handleInput}
                  ></textarea>
                </div>
                <div className='input-group m-2'>
                  <span className='input-group-text w-25'>job requirements</span>
                  <textarea
                    id='requirements'
                    className='form-control'
                    placeholder='description'
                    value={job.requirements}
                    onChange={handleInput}
                  ></textarea>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                  Close
                </button>
                <button onClick={save} disabled={disabled()} type='button' className='btn btn-primary'>
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
