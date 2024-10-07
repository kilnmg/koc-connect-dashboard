import { error } from '@sveltejs/kit'
import { KILN_API_KEY } from '$env/static/private'
/** @type {import('./$types').PageServerLoad} */ export async function load ({
  params
}) {
  const stakingContract = params.proxy

  const fetchEthPrice = async () => {
    const response = await fetch(
      'https://api.coinbase.com/v2/prices/ETH-USD/spot'
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const json = await response.json()
    return json['data']['amount']
  }

  const fetchDepositors = async () => {
    const query = `
    query DepositsQuery($stakingContract: Bytes!) {
        deposits(where: { stakingContract: $stakingContract }, first: 100000) {
            depositor
            publicKey
        }
    }`
    const response = await fetch(
      'https://query.thegraph.kiln.fi/subgraphs/name/onchain-v1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables: {
            stakingContract
          }
        })
      }
    )

    const responseBody = await response.json()

    if (responseBody.errors) {
      throw new Error(responseBody.errors.map(err => err.message).join('\n'))
    }

    return responseBody
  }

  const fetchStakes = async () => {
    const response = await fetch(
      `https://api.kiln.fi/v1/eth/stakes?proxies=${params.proxy}&onchain_v1_include_net_rewards=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${KILN_API_KEY}`
        }
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const stakes = await response.json()
    return stakes
  }

  const getKpis = async () => {
    const stakesResponse = await fetchStakes()
    const depositorsResponse = await fetchDepositors()
    const ethPrice = await fetchEthPrice()

    const stakes = await stakesResponse.data // Assuming the response has a data property
    const depositors = await depositorsResponse.data.deposits // Assuming it also has a data.deposits property

    const toEther = x => Number(x) / 1e18

    const processedStakes = stakes.map(val => {
      const depositor = depositors.find(
        d => d.publicKey === val.validator_address
      )

      return {
        ...val,
        rewards: toEther(val.rewards),
        consensus_rewards: toEther(val.consensus_rewards),
        execution_rewards: toEther(val.execution_rewards),
        balance: toEther(val.balance),
        effective_balance: toEther(val.effective_balance),
        gross_apy: val.gross_apy / 100,
        staker: depositor?.depositor,
        claimable_consensus_rewards: toEther(val.claimable_consensus_rewards),
        claimable_execution_rewards: toEther(val.claimable_execution_rewards)
      }
    })

    const totalRewards = processedStakes.reduce(
      (acc, cur) => acc + cur.rewards,
      0
    )

    const totalRewardsNet = totalRewards * 0.85
    // TODO : fetch the contract fees on chain or on a back-end
    const generatedRevenue = totalRewards * 0.06 // Make sure contract is defined in your context

    const activeVals = processedStakes.filter(val =>
      val.state.startsWith('active')
    )
    const tvl = activeVals.length * 32 // Assuming each active validator represents 32 ETH

    const avgAPY =
      processedStakes.reduce((acc, cur) => acc + (cur.gross_apy || 0), 0) /
      processedStakes.length

    const avgAPYNet = avgAPY * (1 - 0.06)

      // TODO fetch the fees of the contract on chain
    const estArr = tvl * avgAPY * 0.06 // Make sure contract is defined in your context

    let grouped = activeVals.reduce((curr, val) => {
      let group = curr.find(g => g.staker === `${val.staker}`)
      if (group) {
        group.values.push(val)
      } else {
        curr.push({ staker: `${val.staker}`, values: [ val ] }) 
      }
      return curr
    }, [])

    return {
      totalRewards: totalRewards,
      totalRewardsUSD: totalRewards * ethPrice,
      tvl,
      tvlUSD: tvl * ethPrice,
      avgAPY,
      avgAPYNet,
      generatedRevenue,
      generatedRevenueUSD: generatedRevenue * ethPrice,
      estArr,
      estArrUSD: estArr * ethPrice,
      activeVals: activeVals.length,
      totalRewardsNet,
      totalRewardsNetUSD: totalRewardsNet * ethPrice,
      uniques: grouped.length,
      avgPerSafe: tvl / grouped.length,
      avgPerSafeUSD: tvl / grouped.length * ethPrice,
    }
  }

  if (params.proxy) {
    return { proxy: params.proxy, kpis: await getKpis() }
  }
  error(404, 'Not found')
}
