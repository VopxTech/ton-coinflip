import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CoinFlipConfig = {
    id: number;
};

export function coinFlipConfigToCell(config: CoinFlipConfig): Cell {
    return beginCell().storeUint(config.id, 64).endCell();
}

export class CoinFlip implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new CoinFlip(address);
    }

    static createFromConfig(config: CoinFlipConfig, code: Cell, workchain = 0) {
        const data = coinFlipConfigToCell(config);
        const init = { code, data };
        const address = contractAddress(workchain, init);

        return new CoinFlip(address, init);
    }

    async sendPlay(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(1, 32).endCell(),
        });
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(2, 32).endCell(),
        });
    }

    async getBalance(provider: ContractProvider) {
        const { stack } = await provider.get('balance', []);
        return {
            balance: stack.readNumber(),
        };
    }
}
