# mojodns javascript client

[![npm version](https://badge.fury.io/js/mojodns.svg)](https://badge.fury.io/js/mojodns)
[![Node.js Package](https://github.com/BlackFenix2/mojodns-js/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/BlackFenix2/mojodns-js/actions/workflows/npm-publish.yml)

JavaScript client for <https://mojodns.com/>

## Supported Runtimes

This Driver supports and is tested on:

- Node.js
  - LTS
  - Stable
- Chrome
- Firefox
- Safari
- Microsoft Edge

## Using the Client

### Installation

#### Node.js

`npm install --save mojodns`

or

`yarn add mojodns`

### Usage

```ts
import MojodnsClient from "mojodns";

const client = new MojodnsClient("your-api-key");

const response = await client.GetA("google.com");

response.answerResourceRecords.forEach((answer) => {
  console.log(JSON.Stringify(answer));
});
```
