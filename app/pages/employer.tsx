import { WithId } from 'mongodb'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Job, Negotiation, Payload } from '../../shared'
import { InputJobElement } from '../components/input.job.element'
import { JobElement } from '../components/job.element'
import { NegotiationElement } from '../components/negotiation.element'
import { client } from '../utils/client'

interface EmployerProps {
  auth: Payload
}

export const Employer = ({ auth }: EmployerProps) => {
  const [selectedJob, selectJob]: [Job, Dispatch<SetStateAction<Job>>] = useState() as [Job, Dispatch<SetStateAction<Job>>]
  const [jobs, setJobs]: [WithId<Job>[], Dispatch<SetStateAction<WithId<Job>[]>>] = useState() as [
    WithId<Job>[],
    Dispatch<SetStateAction<WithId<Job>[]>>
  ]
  const [negotiations, setNegotiation]: [Negotiation[], Dispatch<SetStateAction<Negotiation[]>>] = useState() as [
    Negotiation[],
    Dispatch<SetStateAction<Negotiation[]>>
  ]

  useEffect(() => {
    client.get('/api/jobs').then(setJobs)
    client.get('/api/negotiations').then(setNegotiation)
  }, [])
  return (
    <>
      <div className='d-flex w-100'>
        <div className='card m-2 w-50'>
          <div className='card-header'>
            <h5 className='card-title'>Job Offers</h5>
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              {jobs &&
                jobs.map((it: WithId<Job>, key: number) => <JobElement key={`job_${key}`} auth={auth} job={it} selectJob={selectJob} />)}
              <li className='list-group-item'>
                <button className='btn btn-primary w-100' data-bs-target='#InputJobModal' data-bs-toggle='modal'>
                  create new job offer
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='card m-2 w-50'>
          <div className='card-header'>
            <h5 className='card-title'>Applications</h5>
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              {negotiations &&
                negotiations.map((it: Negotiation, key: number) => <NegotiationElement key={`negotiation_${key}`} negotiation={it} />)}
            </ul>
          </div>
        </div>
      </div>
      <InputJobElement auth={auth} inputJob={selectedJob} />
    </>
  )
}
