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

localhost
`m/43'/60'/1775'/ [personaPath] /1396221098'/30421367'/1913926186'/661558778'/2091524667'/1834949338'/925307131'/689768053'/107'/ [subPath]`

bunjin.github.io:
`m/43'/60'/1775'/ [personaPath] /1797325644'/1396991353'/426541327'/193811525'/1119920421'/909605457'/64242277'/1029069725'/207'/ [subPath]`

navigate to `localhost:8000`

or use the github pages hosted version:
https://bunjin.github.io/appKeys/



# API

ec keys:

ecdsa

eth

stark

next:

ecdh ...


