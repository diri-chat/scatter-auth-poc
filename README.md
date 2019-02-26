# Login with Scatter Proof of Concept

## About

This project proves how to login to a centralised service simply using Scatters sign feature as a method of authentication.

![POC Concept](https://github.com/altercation/solarized/raw/master/img/solarized-palette.png)

The Node.JS/backend service hosts a `POST /login` endpoint which receives a post body of

```
{
    "message": "thekellygang would like to login using the active permission. Block ID: 44738933 A1B6A6B74882",
    "signature": "SIG_K1_K2od7hYggNV3HF3ZkoewifhRGWmbuTavbHLiA81CQPt6rUgPF1E24BqdyJ8rZyKdBBvnCbHYz6dHmQZeF9sqe7qg4FUtUV"

}
```

The message is done in a plain English fashion for the end users readability during the client side signing process.

The block information is used as a timestamp, the service ensures the block number matches the block ID.

If passed, the service proceeds to lookup the public key for the declared permission ('active' in example) and verifies the message was indeed signed by it's private key using the signature property.

## Run

```
yarn
yarn build
yarn start
```

Typescript errors expected, ignore.
