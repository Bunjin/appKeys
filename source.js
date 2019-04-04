// App Keys test

let Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  console.log("already a web3 provider, connecting")
  window.web3 = new Web3(web3.currentProvider);
  var provider = web3.currentProvider
} else {
  console.log('No web3? You should consider trying MetaMask!')
}

function testGetPublicKey(subHdPath){
  return new Promise(function(resolve, reject){
    provider.sendAsync(
      {
	method: "appKey_eth_getPublicKey",
	params: subHdPath
      },
      function(err, result) {
	if (err) {
	  return console.error(err);
	}
	return resolve(result)
      }
    )
  })
}

function testGetAddress(subHdPath){
  return new Promise(function(resolve, reject){
    provider.sendAsync(
      {
	method: "appKey_eth_getAddress",
	params: subHdPath
      },
      function(err, result) {
	if (err) {
	  return console.error(err);
	}
	return resolve(result)
      }
    )
  })
}


async function testSignTx(subHdPath, to, value, nonce){
  let from = (await testGetAddress(subHdPath)).result
  let txParams = {
    "from": from,
    "to": to,
    "gas": "0x76c0", // 30400
    "gasPrice": "0x9184e72a", 
    "value": value,
    "nonce": nonce,
    "data": "0x"
  }
  return new Promise(function(resolve, reject){
    provider.sendAsync(
      {
	method: "appKey_eth_signTransaction",
	params: [subHdPath, txParams],
      },
      function(err, result){
	if (err) {
	  return console.error(err);
	}
	return resolve(result)
      }
    )
  })
}

async function testSignMsg(subHdPath, message){
  return new Promise(function(resolve, reject){
    provider.sendAsync(
      {
	method: "appKey_eth_signMessage",
	params: [subHdPath, message],
      },
      function(err, result){
	if (err) {
	  return console.error(err);
	}
	return resolve(result)
      }
    )
  })
}

async function testSignMsgStark(subHdPath, message){
  return new Promise(function(resolve, reject){
    provider.sendAsync(
      {
	method: "appKey_stark_signMessage",
	params: [subHdPath, message],
      },
      function(err, result){
	if (err) {
	  return console.error(err);
	}
	return resolve(result)
      }
    )
  })
}

async function  testSignTypedMessage(subHdPath, msgString, msgUint){
  let from = (await testGetAddress(subHdPath)).result
  const finalMessage = prepareTypedMessage(from, msgString, msgUint)
  return new Promise(function(resolve, reject){
      provider.sendAsync(
	{
	  method: "appKey_eth_signTypedMessage",
	  params: [subHdPath, finalMessage],
	}, function(err, result){
	  return resolve(result)
	}
      )
    })
  }


function prepareTypedMessage(fromAccount, msgString, msgUint){
  // // EIP 712 data
  const domain = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "salt", type: "bytes32" }
  ]
  const dummyStruct = [
    {name: "msgString", type: "string"},
    {name: "msgUint", type: "uint"}
  ]

  const domainData = {
    name: "MetaMask Dummy Plugin",
    version: "1",
    chainId: "1",
    salt: "0x12345611111111111"
  }

  let finalMessage = JSON.stringify({
    types: {
      EIP712Domain: domain,
      Struct: dummyStruct,
    },
    domain: domainData,
    primaryType: "Struct",
    message: { "msgString": msgString,
	       "msgUint": msgUint}
  })
  return finalMessage
}








async function main(){

  console.log("eth_getPublicKey for 0/1")
  console.log(await testGetPublicKey("0/1"))
  
  console.log("eth_getAddress for 0/1")  
  console.log(await testGetAddress("0/1"))
  
  console.log("eth_getPublicKey for 1'/0")  
  console.log(await testGetPublicKey("1'/0"))
  
  console.log("eth_signMessage for 1'/0")  
  console.log(await testSignMsg("1'/0", "1e542e2da71b3f5d7b4e9d329b4d30ac0b5d6f266ebef7364bf61c39aac35d0" + "0"))
  
  console.log("stark_signMessage for 1'/0")    
  console.log(await testSignMsgStark("1'/0", "1e542e2da71b3f5d7b4e9d329b4d30ac0b5d6f266ebef7364bf61c39aac35d0" + "0"))
  
  console.log("eth_signTransaction for 1'/0")    
  console.log(await testSignTx("1'/0", "0xbab49c2bfbc4a5a62ccdcd405380515fe62efd64", 1, "0x1"))
  
  console.log("eth_signTypedMessage for 1'/0")    
  console.log(await testSignTypedMessage("1'/0", "hello world", 2))
}


main()
