# Sanna

Sanna helps to increase trust between parties through immutable proofs on the EOS blockchain.

Sanna's first application is solving a problem that the Real Estate industry faces. Currently, potential tenants are required to send electronic document to the letting agents as part of their application to rent a property; it's very easy to doctor these electronic documents and most of them expose more personal information that is required.

Through the use of EOS Smart Contracts and Public Key cryptography, Sanna makes it possible to prove the required information securely and privately.

## Prerequisites

Make sure Docker and Node.js are installed

* Install Docker: https://docs.docker.com/docker-for-mac/install/
* Install Node.js: https://nodejs.org/en/

The DApp and eosio will occupy the ports 3000, 8888 and 9876. Make sure nothing else is already running on these ports.

Clone the repository:

```sh
git clone https://github.com/Gamithra/published-proofs.git
```

The following guide assumes you are using macOS.

## Quick Start - Run the DApp

In this section we provide a single command script to run all the commands needed to start both the blockchain and UI. For more detail on each component see the `Detailed guide` below.

**To start:**

```sh
./quick_start.sh
```

The above command will execute the following in sequence:

1. `first_time_setup.sh`
2. `start_eosio_docker.sh`
3. `start_frontend.sh`

**To stop**, press `ctrl+c` on your keyboard, and execute:

```sh
docker stop eosio_notechain_container
```

## Project structure

```js
published-proofs // project directory
├── eosio_docker
│   ├── * contracts // this folder will be mounted into docker
│   │   └── publishproofs
│   │       └── publishproofs.cpp // the main smart contract
│   ├── * data // blockchain data, generated after first_time_setup.sh
│   │   ├── blocks
│   │   ├── state
│   │   └── initialized // to indicate whether the blockchain has been initialized or not
│   └── * scripts // scripts and utilities for docker container
│       ├── accounts.json // pre-create account names, public and private keys (for demo only)
│       ├── continue_blockchain.sh // continue the stopped blockchain
│       ├── create_accounts.sh // create account data
│       ├── deploy_contract.sh // deploy contract
│       └── init_blockchain.sh // script for creating accounts and deploying contract inside docker container
└── frontend
    ├── node_modules // generated after npm install
    ├── public
    │   └── index.html // html skeleton for create react app
    ├── src
    │   ├── pages
    │   │   └── <name>.jsx // our different pages
    │   └── index.js // for react-dom to render the app
    ├── package-lock.json // generated after npm install
    └── package.json // for npm packages

* means the directory will be mounted to the docker container. Whenever the file changes on the local machine, it will be automatically reflected in the docker environment.
```

## DApp development

The DApp consists of two parts. eosio blockchain and frontend react app. These can be found in:

* eosio_docker
  * eosio block producing node (local node) wrapped in a docker container
    * 1 smart contract
    * auto smart contract deployment
    * auto create 7 user accounts
* frontend
  * node.js development environment
    * create-react-app: http://localhost:3000/

Users interact with the UI in client and sign the transaction in frontend. The signed transaction (which is an `update` action in this demo DApp) is sent to the blockchain directly. After the transaction is accepted in blockchain, the note is added into the multi index table in blockchain.

The UI, index.jsx, reads the notes data directly from nodeos using 'getTableRows()'. The smart contract, notechain.cpp, stores these notes in the multi index table using 'emplace()'' and 'modify()'.

## Docker usage

Docker is used to wrap the eosio software inside and run a container (instance) from an image (eosio/eos-dev v1.1.0). To work with the blockchain directly, by running the scripts or using a cleos command line, you need to go into the container bash.

Go into container bash:

```sh
docker exec -it eosio_notechain_container bash
```

We have already set the container working directory to `/opt/eosio/bin/`, you could run cleos command in this directory directly. For documentation of cleos: https://developers.eos.io/eosio-nodeos/docs/cleos-overview

You can also look at the `init_blockchain.sh` or `deploy_contract.sh` scripts for examples of cleos command lines.

To exit from inside the container bash:

```sh
exit
```

## Smart contract (Blockchain):

The smart contract can be found at `eosio_docker/contracts/notechain/notechain.cpp`, you can edit this smart contract. You will then need to compile and deploy the contract to the blockchain.

To save time, we prepared some scripts for you. Execute the scripts in the container bash (see above.)

The following script will help you to unlock the wallet, compile the modified contract and deploy to blockchain. 1st parameter is the contract name; 2nd parameter is the account name of the contract owner, 3rd and 4th parameter references wallet related information that was created during the `Initial setup`:

```sh
./scripts/deploy_contract.sh notechain notechainacc notechainwal $(cat notechain_wallet_password.txt)
```

After running this script the modified smart contract will be deployed on the blockchain.

Remember to redeploy the NoteChain contract each time you modify it using the steps above!

## Frontend

The UI code can be found  at noteChain/frontend/src/pages/index.jsx), once you have edited this code the frontend react app compile automatically and the page on browser will be automatically refreshed. You can see the change on the browser once the browser finishes loading.

## Docker commands

If you are more familiar with docker, you could use the docker commands below to have better control with the whole environment. Below are the explanations of each of the commands:

**Execute below command in `/eosio_docker`:**

Run container from eosio/eos-dev image by mounting contracts / scripts to the container with running the init_blockchain.sh script as the process.
The init_blockchain.sh script run the local node of the blockchain and initializes wallets / contract / data.

```sh
docker run --rm --name eosio_notechain_container \
-p 8888:8888 -p 9876:9876 \
--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \
-w "/opt/eosio/bin/" eosio/eos-dev:v1.1.0 /bin/bash -c "./scripts/init_blockchain.sh"
```

Output and follow docker console logs:

```sh
docker logs eosio_notechain_container --follow
```

Remove the container (will remove all wallets / contracts / data), useful if you want to re-init the whole DApp.

```sh
docker rm -f eosio_notechain_container
```

Stop the container (see below troubleshoot section to see how to pause and continue the blockchain):

```sh
docker stop eosio_notechain_container
```
