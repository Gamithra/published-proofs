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
