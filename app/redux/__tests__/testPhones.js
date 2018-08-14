import nock from 'nock'
import _ from 'lodash'

import {
  customCreateRealStore,
  timeout,
} from 'masmovil-app/app/jest/utils'
import * as phonesActions from 'masmovil-app/app/redux/phones'


const generateInitialState = () => ({
  phones: {
    entities: [],
  }
})

describe('Phones redux', () => {
  it('fetchPhones', async () => {
    const phonesMock = nock('http://fakeurl.fake')
      .get('/phones/')
      .query(true)
      .reply(200, {
        status: 200,
        phones: [
          {
            'id': 0,
            'title': 'iphone 5s',
          },
        ],
      })

    const store = customCreateRealStore(generateInitialState())
    await store.dispatch(phonesActions.fetchPhones())

    phonesMock.done()
    await timeout(20)

    expect(_.map(store.accumulator, a => a.type)).toEqual([
      "phones/FETCH_PHONES",
      "phones/FETCH_PHONES_SUCCESS",
    ])
    const state = store.getState()
    expect(state.phones.length).toEqual(1)
    expect(state).toMatchSnapshot()
  })
})