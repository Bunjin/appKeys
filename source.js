// App Keys test

// Todo main:
// [] change params of sign methods to hdPath
// [] implement vanilla sign

// Todo test:
// 
let Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  console.log("already a web3 provider, connecting")
  window.web3 = new Web3(web3.currentProvider);
  var provider = web3.currentProvider
} else {
  console.log('No web3? You should consider trying MetaMask!')
}

var mainAccount = "0x0"

function testGetPublicKey(hdPath){
  provider.sendAsync(
    {
      method: "appKey_eth_getPublicKey",
      params: hdPath
    },
    function(err, result) {
      if (err) {
	return console.error(err);
      }
      console.log(result)
      return Promise.resolve(result)
    }
  )
}

function testGetAddress(hdPath){
  provider.sendAsync(
    {
      method: "appKey_eth_getAddress",
      params: hdPath
    },
    function(err, result) {
      if (err) {
	return console.error(err);
      }
      console.log(result)
      return Promise.resolve(result)
    }
  )
}


async function testSignTx(hdPath, to, value, nonce){
  let from = await testGetAddress(hdPath)
  let txParams = {
    "from": from,
    "to": to,
    "gas": "0x76c0", // 30400
    "gasPrice": "0x9184e72a", 
    "value": value,
    "nonce": nonce,
    "data": "0x"
  }
  console.log(txParams)
  result = await provider.sendAsync(
    {
      method: "appKey_eth_signTransaction",
      params: [hdPath, txParams],
    },
    function(err, result){
      if (err) {
	return console.error(err);
      }
      console.log(result)
      return result
    }
  )
}

async function testSignMsg(hdPath, message){
  result = await provider.sendAsync(
    {
      method: "appKey_eth_signMessage",
      params: [hdPath, message],
    },
    function(err, result){
      if (err) {
	return console.error(err);
      }
      console.log(result)
      return result
    }
  )
}

async function testSignMsgStark(hdPath, message){
  result = await provider.sendAsync(
    {
      method: "appKey_stark_signMessage",
      params: [hdPath, message],
    },
    function(err, result){
      if (err) {
	return console.error(err);
      }
      console.log(result)
      return result
    }
  )
}



testGetPublicKey("0/1")
testGetAddress("0/1")

//testGetPublicKey("1'/0")
//testGetAddress("1'/0")
//testSignMsg("1'/0", "1e542e2da71b3f5d7b4e9d329b4d30ac0b5d6f266ebef7364bf61c39aac35d0" + "0")
//testSignMsgStark("1'/0", "1e542e2da71b3f5d7b4e9d329b4d30ac0b5d6f266ebef7364bf61c39aac35d0" + "0")

//testSignTx("1'/0", "0xbab49c2bfbc4a5a62ccdcd405380515fe62efd64", 1, "0x1")
