import nock from 'nock'

import { withMockedConsoleError } from 'src/libs/utils/test'

import api, { fetchHelper } from './api-client'

describe('ApiClient', () => {
  const host = 'http://localhost'

  const goodResponseBody = { code: 200, content: 'test' } as const

  describe('fetchHelper', () => {
    it('handles generic HTTP errors', async () => {
      const badResponseBody = { code: 401, statusText: 'statusText', error: 'error' }
      nock(host).get('/dummy').reply(401, badResponseBody)

      const response = await fetchHelper('http://localhost/dummy', { method: 'GET' })

      const expectedResponse = {
        status: 401,
        error: 'Unauthorized',
      }

      expect(response).toStrictEqual(expectedResponse)
    })

    it(
      'handles network errors',
      withMockedConsoleError(async () => {
        nock(host).get('/dummy').replyWithError({
          message: 'Network request failed',
          code: 'ECONNABORTED',
        })

        const response = await fetchHelper('http://localhost/dummy', { method: 'GET' })

        const expectedResponse = {
          status: 0,
          error: 'API error: TypeError: Network request failed',
        }

        expect(response).toStrictEqual(expectedResponse)
      }),
    )
  })

  describe('HTTP methods', () => {
    describe('get', () => {
      it('sends request', async () => {
        nock(host).get('/dummy').reply(200, goodResponseBody)

        const response = await api.get('http://localhost/dummy')

        expect(response).toStrictEqual(goodResponseBody)
      })
    })

    describe('put', () => {
      it('sends request', async () => {
        nock(host).put('/dummy').reply(200, goodResponseBody)

        const response = await api.put('/dummy', {})

        expect(response).toStrictEqual(goodResponseBody)
      })
    })

    describe('post', () => {
      it('sends request', async () => {
        nock(host).post('/dummy').reply(200, goodResponseBody)

        const response = await api.post('/dummy', {})

        expect(response).toStrictEqual(goodResponseBody)
      })
    })

    describe('delete', () => {
      it('sends request', async () => {
        nock(host).delete('/dummy').reply(200, goodResponseBody)

        const response = await api.delete('/dummy')

        expect(response).toStrictEqual(goodResponseBody)
      })
    })
  })
})
