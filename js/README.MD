# Javascript Snippets

This section contains some snippets of different interactions with the Bridge using Javascript.

## Requirements

- Nodejs LTS

## Usage

Run `npm ci` and then choose the script you want to execute.

### bitcoin-related-interactions

```
node bitcoin-related-interactions.js
```

This script will connect to Testnet public node and fetch Bitcoin related information. At the moment of writing this Readme it simply includes methods to fetch Bitcoin Block headers, starting form the tip of the chain.

It's our intention to keep on including more of the existing logic of the Bridge.