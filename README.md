# TON Coinflip

Smart contract -based coinflip game on TON blockchain. Written in Func and React Vite. Currently deployed on the testnet:

[Play on Web](https://coinflip.vopx.fi/)

[Play on Telegram](https://t.me/toncoinfliptnetbot/play)

## Project structure

### Frontend-UI

Frontend of the project, written in React. Frontend re-uses the smart contract from the blueprint. By default, `App.tsx` has a hardcoded address of the contract, but it can be changed to any other address:

```ts
const { balance, sendPlay } = useCoinFlipContract(
  "EQCuWDIPWO6fGDN7w4ZpwNtBTEjl6_shllCJnfZptcoWgV-l" // Change this
);
```

### Usage

#### Development

```bash
cd frontend-ui
npm install
npm run dev
```

#### Build

```bash
npm run build
```

### Blueprint

Root of the smart contract, written in Func. Subdirectories:

- `contracts` - source code of all the smart contracts of the project and their dependencies.
- `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
- `tests` - tests for the contracts.
- `scripts` - scripts used by the project, mainly the deployment scripts.

#### Usage

#### Build The Contract

`npx blueprint build` or `yarn blueprint build`

#### Test The Contract

`npx blueprint test` or `yarn blueprint test`

#### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

#### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
