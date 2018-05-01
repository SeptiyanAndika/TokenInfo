# TokenInfo
Simple api to get balance Ethereum ERC20 tokens and Info about Ethereum ERC20 tokens

## Config
To set Config provider and running port,

```bash
{
  "httpProvider":"https://kovan.infura.io",
  "port":3000
}
```

## Get Token Info
This API response will show you the ERC20 token info.

```bash
http://localhost:3000/token/CONTRACT_ADDRESS
```
- ###### Response (JSON)
```bash
{
  "name": "Test Swipe Token",
  "symbol": "TSWIPE",
  "totalSupply": 10000000,
  "decimals": "18"
}
```


## Get Balance Info
This API response will show Address Balance of ERC20 token.

```bash
http://localhost:3000/balance/CONTRACT_ADDRESS/USER_ADDRESS
```
- ###### Response (JSON)
```bash
{
  "symbol": "TSWIPE",
  "balance": 100
}
```