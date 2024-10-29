import Web3 from 'web3';
import * as bitcoin from 'bitcoinjs-lib';
import litecore from 'litecore-lib';
import { TronWeb } from 'tronweb';

const web3 = new Web3();
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
}
)
function isValidEthereumAddress(address) {
  return web3.utils.isAddress(address);
}

function isValidBitcoinAddress(address) {
  try {
    bitcoin.address.fromBase58Check(address);
    return true;
  } catch (e) {
    try {
      bitcoin.address.fromBech32(address);
      return true;
    } catch (e) {
      return false;
    }
  }
}

function isValidLitecoinAddress(address) {
  return litecore.Address.isValid(address, 'livenet');
}

function isValidTronAddress(address) {
  return tronWeb.isAddress(address);
}


// ETH & BNB
console.log(isValidEthereumAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88')); // true
console.log(isValidEthereumAddress('0xInvalidEthereumAddress1234567890')); //false

// BTC:
console.log(isValidBitcoinAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')); // true (P2PKH)
console.log(isValidBitcoinAddress('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy')); // true (P2SH)
console.log(isValidBitcoinAddress('bc1qu4tg3cuqjpesec3neww7px5a3yj3a97yex5ff2')); // true (Bech32)
console.log(isValidBitcoinAddress('invalidBitcoinAddress12345')); // false

// LTC:
console.log(isValidLitecoinAddress('LTCPodGRwZSmPX6YCMECYwTJD4RfvMmijm')); // true (P2PKH)

// TRX:
console.log(isValidTronAddress('TSvCNDjZe3XF7eEe1eCYpAQdJCifLtkZZA'));
console.log(isValidTronAddress('TSvCNDjZe3XF7eEe1eCYpAQdJCifLt'));