/* globals TextEncoder, crypto */

import Eos from 'eosjs'

const bankAccountId = 'PLEASE PASTE BANK ID HERE'
const privateKey = 'PLEASE PASTE SUPER SECRET KEY HERE'

/**
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function arrayBufferToHex (buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('')
}

/**
 *
 * @param {string} input - Input text as string
 * @returns {Promise<string>} - The hash as a hex string
 */
async function sha256 (input) {
  const buffer = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-256', buffer)
  return arrayBufferToHex(hash)
}

/**
 * @param {string} userId
 * @param {string} amount
 * @param {string} dateRange
 */
export async function publishProof (userId, amount, dateRange) {
  const eos = Eos({ keyProvider: privateKey })

  const proof = sha256(`${userId} had a minimum balance of ${amount} during ${dateRange}`)

  const result = await eos.transaction({
    actions: [{
      account: 'proofchainacc',
      name: 'publish',
      authorization: [{
        actor: bankAccountId,
        permission: 'active'
      }],
      data: {
        _bank: bankAccountId,
        _proof: proof
      }
    }]
  })

  console.log(result)
}

/**
 * @param {string} userId
 * @param {string} amount
 * @param {string} dateRange
 * @returns {Promise<null | string>} - Either the account id of the bank, or null if the proof wasn't valid
 */
export async function verifyProof (userId, amount, dateRange) {
  const eos = Eos({ keyProvider: privateKey })

  const proof = sha256(`${userId} had a minimum balance of ${amount} during ${dateRange}`)

  const result = await eos.getTableRows({
    json: true,
    code: 'publishproofs',
    scope: 'publishproofs',
    table: '_proofs',
    tableKey: 'proof',
    lower_bound: proof,
    limit: 1
  })

  // if (result.more) {
  //   throw new Error('More than one result for proof')
  // }

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0].bank
}
