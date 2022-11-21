import { HttpMethod } from 'http-enums'

import { publish } from './state'

const headers = {
  Accept: 'application/json'
}
const jsonHeaders = {
  ...headers,
  'Content-Type': 'application/json'
}
const statusReject = (response: Response) => (response.ok ? response : Promise.reject(response))
export const extractJson = (response: Response) => response.json()

const client = {
  get: <T = any>(url: string): Promise<T> =>
    fetch(url, { headers, credentials: 'same-origin' })
      .then(statusReject)
      .then(extractJson)
      .catch(publish('ErrorPopover_errorHandling')) as Promise<T>,
  post: <T = any>(url: string, body: any): Promise<T> =>
    fetch(url, { body: JSON.stringify(body), method: HttpMethod.POST, headers: jsonHeaders, credentials: 'same-origin' })
      .then(statusReject)
      .then(extractJson)
      .catch(publish('ErrorPopover_errorHandling')) as Promise<T>,
  patch: <T = any>(url: string, body: any): Promise<T> =>
    fetch(url, { body: JSON.stringify(body), method: HttpMethod.PATCH, headers: jsonHeaders, credentials: 'same-origin' })
      .then(statusReject)
      .then(extractJson)
      .catch(publish('ErrorPopover_errorHandling')) as Promise<T>
}

export { client }
