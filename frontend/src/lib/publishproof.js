/* globals TextEncoder, crypto */

import Eos from 'eosjs'

const EOS_SERVER = 'http://127.0.0.1:8888'

// Export the Eos lib for debugging
window.Eos = Eos

const bankAccountId = 'useraaaaaaag'
const bankAccountPrivateKey = '5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo'

const landlordAccountId = 'useraaaaaaaf'
const landlordAccountPrivateKey = '5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK'

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
  const eos = Eos({ keyProvider: bankAccountPrivateKey, httpEndpoint: EOS_SERVER })

  const plaintext = `${userId} had a minimum balance of ${amount} during ${dateRange}`
  const ciphertext = await sha256(`${userId} had a minimum balance of ${amount} during ${dateRange}`)

  const result = await eos.transaction({
    actions: [{
      account: 'proofs.acc',
      name: 'publish',
      authorization: [{
        actor: bankAccountId,
        permission: 'active'
      }],
      data: {
        _bank: bankAccountId,
        _proof: ciphertext
      }
    }]
  })

  console.log(`"${plaintext}" published to the block chain`)
  console.log(result)
}

/**
 * @param {string} userId
 * @param {string} amount
 * @param {string} dateRange
 * @returns {Promise<null | string>} - Either the account id of the bank, or null if the proof wasn't valid
 */
export async function verifyProof (userId, amount, dateRange) {
  const eos = Eos({ keyProvider: landlordAccountPrivateKey, httpEndpoint: EOS_SERVER })

  const proof = await sha256(`${userId} had a minimum balance of ${amount} during ${dateRange}`)

  const result = await eos.getTableRows({
    json: true,
    code: 'proofs.acc',
    scope: 'proofs.acc',
    table: 'proofstruct',
    // tableKey: 'proof',
    // lower_bound: proof,
    limit: 1000
  })

  console.log(result.rows)

  // FIXME: CREATE AN INDEX!!
  const row = result.rows.find((row) => row.proof === proof)

  return (row ? row.bank : null)

  // if (result.more) {
  //   throw new Error('More than one result for proof')
  // }

  // if (result.rows.length === 0) {
  //   return null
  // }

  // return result.rows[0].bank
}

// Export functions for debugging
window.publishProof = publishProof
window.verifyProof = verifyProof
