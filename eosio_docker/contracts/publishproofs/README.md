# Publish Proofs

## EOS Smart Contract


### Publishing a proof
When the bank's client submits a request for a proof to be attested to, the bank's middleware first parses the proof (which will be constructed in an agree language/format).

If the bank finds the requested proof to be true then it will start the process of attesting to this fact by publishing the proof to the Publish Proofs Smart Contract.

To publish the proof, the bank first creates a SHA256 hash of the requested proof e.g.

```
SHA256("JoeBlogs007 HAS AVG BALANCE >= $2500 OVER 3M ON 1537647482")
```

The bank then signs the hash and submits the signture to the Smart Contract:

```
cleos push action proofs.code publish '[ "hsbc", "004725f3be17062d0707a2598ecfd1985286731e98bd57c19dd48c25c5050aa233452f94820bc0f8bd45bd93a7af3033e2c664dc17ab4481aa5e1d0d170253" ]' -p hsbc
```