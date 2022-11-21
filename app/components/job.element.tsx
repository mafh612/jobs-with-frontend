import { WithId } from 'mongodb'
import React, { Dispatch, SetStateAction } from 'react'
import { Role } from '../../shared'
import { Job, Payload } from '../../shared/interfaces'

interface JobProps {
  auth: Payload
  job: WithId<Job>
  applyForJob?(job: WithId<Job>): void
  selectJob?(job: Job): void
  setActive?: Dispatch<SetStateAction<string>>
  active?: string
}

export const JobElement = ({ active, applyForJob, auth, job, selectJob, setActive }: JobProps) => {
  const apply = () => {
    if (auth.role === Role.EMPLOYEE && applyForJob) applyForJob(job)
  }
  const handleActive = () => {
    if (auth.role === Role.EMPLOYEE && applyForJob) setActive && setActive(job.name)
  }
  const availableActions = () => {
    switch (auth?.role) {
      case Role.EMPLOYEE:
        return (
          <div className={`collapse ${active === job.name ? 'show' : 'hide'}`}>
            <div className=' d-flex justify-content-end'>
              <button className='btn btn-success' onClick={apply}>
                apply
              </button>
            </div>
          </div>
        )
      case Role.EMPLOYER:
        return (
          <button
            className='btn btn-secondary'
            data-bs-target='#InputJobModal'
            data-bs-toggle='modal'
            onClick={() => selectJob && selectJob(job)}
          >
            edit
          </button>
        )
      default:
        return <p></p>
    }
  }

  return (
    <>
      <span id={job._id.toString()} className='list-group-item list-group-item-action' onClick={handleActive}>
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='mb-1'>{job.name}</h5>
          <small>{job.created?.toString()}</small>
        </div>
        <p className='mb-1'>{job.description}</p>
        <small>{job.requirements}</small>
        <div className='d-flex w-100 justify-content-end'>{availableActions()}</div>
      </span>
    </>
  )
}
