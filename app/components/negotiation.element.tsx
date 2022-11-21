import React from 'react'
import { Employer, Job, Negotiation } from '../../shared/interfaces'

interface NegotiationProps {
  negotiation: Negotiation
}

export const NegotiationElement = ({ negotiation }: NegotiationProps) => {
  return (
    <span className='list-group-item list-group-item-action' aria-current='true'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{(negotiation.job as Job).name}</h5>
        <small>{negotiation.created?.toString()}</small>
      </div>
      <p className='mb-1'>{(negotiation.employer as Employer).company}</p>
      <small>Contact: {(negotiation.employer as Employer).email}</small>
    </span>
  )
}
