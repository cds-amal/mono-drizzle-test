jest.mock('../../src/DrizzleContract')
import MockedDrizzleContract from '../../src/DrizzleContract'

import { runSaga } from 'redux-saga'
import {
  instantiateContract,
  instantiateWeb3Contract
} from '../../src/contracts/contractsSaga'

import { mockDrizzleStore, mockWeb3Assets } from '../utils/helpers'

describe('Creates a contract', () => {
  let mockedStore, web3Provider, truffleArtifact, accounts

  beforeEach(async () => {
    ;({ web3Provider, accounts, truffleArtifact } = await mockWeb3Assets())
    ;[mockedStore] = mockDrizzleStore({
      web3: { networkId: global.defaultNetworkId },
      accounts
    })
  })

  test('with instantiateWeb3Contract Saga', async () => {
    const mockedWeb3Contract = 'TheGoodsContract'
    const mockedContractName = 'TheGoods'
    const mockedContractEvents = []

    const options = {
      web3Contract: mockedWeb3Contract,
      name: mockedContractName,
      events: mockedContractEvents,
      store: mockedStore,
      web3: web3Provider
    }

    const aContract = await runSaga(
      mockedStore,
      instantiateWeb3Contract,
      options
    ).done
    expect(MockedDrizzleContract).toHaveBeenCalledTimes(1)

    const expectedArgs = [
      mockedWeb3Contract,
      web3Provider,
      mockedContractName,
      mockedStore,
      mockedContractEvents
    ]
    expect(MockedDrizzleContract).toHaveBeenCalledWith(...expectedArgs)

    // It returns a Contract with the proper shape
    expect(aContract).toHaveProperty('cacheCallFunction')
    expect(aContract).toHaveProperty('cacheSendFunction')
    expect(aContract).toHaveProperty('generateArgsHash')
  })

  test('with instantiateContract Saga', async () => {
    const options = {
      contractArtifact: truffleArtifact,
      events: [],
      store: mockedStore,
      web3: web3Provider
    }

    const web3ContractCreator = jest.fn()
    web3Provider.eth.Contract = web3ContractCreator

    const aContract = await runSaga(mockedStore, instantiateContract, options)
      .done
    expect(web3ContractCreator).toHaveBeenCalledTimes(1)
    expect(MockedDrizzleContract).toHaveBeenCalledTimes(1)

    // It returns a Contract with the proper shape
    expect(aContract).toHaveProperty('cacheCallFunction')
    expect(aContract).toHaveProperty('cacheSendFunction')
    expect(aContract).toHaveProperty('generateArgsHash')
  })
})
