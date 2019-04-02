# Applications Keys:

see EIP here:
https://github.com/ethereum/EIPs/pull/1775

see discussion here:
https://ethereum-magicians.org/t/eip-erc-app-keys-application-specific-wallet-accounts/2742


# Setup

[Use `metamask-extension` branch `appKeys`](https://github.com/MetaMask/metamask-extension/tree/appKeys)

[Use `eth-keyring-controller` branch `appKeys` (either npm link or install in proper folders)](https://github.com/MetaMask/KeyringController/tree/appKeys)


[Use `eth-hd-keyring` branch `appKeys` (either npm link or install in proper folders)](https://github.com/MetaMask/eth-hd-keyring/tree/appKeys)

run `node index.js` in appKeys folder to launch dummy website for testing

when modifying source.js, run `browserify source.js > bundle.js`

# Test

HD Paths

localhost:

`m/43'/60'/1775'/ [personaPath] /1396221098'/30421367'/1913926186'/661558778'/2091524667'/1834949338'/925307131'/689768053'/107'/ [subPath]`

bunjin.github.io:

`m/43'/60'/1775'/ [personaPath] /1797325644'/1396991353'/426541327'/193811525'/1119920421'/909605457'/64242277'/1029069725'/207'/ [subPath]`

navigate to `localhost:8000`

or use the github pages hosted version:
https://bunjin.github.io/appKeys/


# HD Path

`m / [standardized Path Beginning]' / [persona path]' / [application uniquely assigned path]' / [app's custom subpath]`

# API

## enabling app keys:

for now they are enabled automatically

.enable() specified in EIP is not implemented

## ec keys

* `appKey_ec_getPublicKey(subHdPath)`
same as `appKey_eth_getPublicKey(subHdPath)`

* `appKey_eth_getAddress(subHdPath)`

## ecdsa signing

### eth

* `appKey_eth_signMessage(subHdPath, message)`
* `appKey_eth_signTransaction(subHdPath, tx)`
* `appKey_eth_signTypedMessage(subHdPath, typedData)`


### stark

* `appKey_stark_signMessage(subHdPath, message)`

message should be 32 bytes

```
provider.sendAsync(
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
```

### other cryptos like Bitcoin

## ecdh [TBD]


