import { WithId } from 'mongodb'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Job, Negotiation, Payload } from '../../shared'
import { JobElement } from '../components/job.element'
import { NegotiationElement } from '../components/negotiation.element'
import { client } from '../utils/client'

interface EmployeeProps {
  auth: Payload
}

export const Employee = ({ auth }: EmployeeProps) => {
  const [active, setActive]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [jobs, setJobs]: [WithId<Job>[], Dispatch<SetStateAction<WithId<Job>[]>>] = useState() as [
    WithId<Job>[],
    Dispatch<SetStateAction<WithId<Job>[]>>
  ]
  const [negotiations, setNegotiation]: [Negotiation[], Dispatch<SetStateAction<Negotiation[]>>] = useState() as [
    Negotiation[],
    Dispatch<SetStateAction<Negotiation[]>>
  ]
  const applyForJob = (job: WithId<Job>) => {
    const negotiation: Negotiation = {
      employee: auth.jti as string,
      employer: job.employer,
      job: job._id,
      hasApplied: true
    }
    client.post('/api/negotiations', negotiation)
  }

  useEffect(() => {
    client.get('/api/jobs').then(setJobs)
    client.get('/api/negotiations').then(setNegotiation)
  }, [])
  return (
    <div className='d-flex w-100'>
      <div className='card m-2 w-50'>
        <div className='card-header'>
          <h5 className='card-title'>Job Offers</h5>
        </div>
        <div className='card-body'>
          <ul className='list-group list-group-flush'>
            {jobs &&
              jobs.map((it: WithId<Job>, key: number) => (
                <JobElement key={`job_${key}`} auth={auth} setActive={setActive} active={active} applyForJob={applyForJob} job={it} />
              ))}
          </ul>
        </div>
      </div>
      <div className='card m-2 w-50'>
        <div className='card-header'>
          <h5 className='card-title'>Jobs Applied</h5>
        </div>
        <div className='card-body'>
          <ul className='list-group list-group-flush'>
            {negotiations &&
              negotiations.map((it: Negotiation, key: number) => <NegotiationElement key={`negotiation_${key}`} negotiation={it} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}
