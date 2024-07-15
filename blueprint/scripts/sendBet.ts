import { Address, toNano } from '@ton/core';
import { CoinFlip } from '../wrappers/CoinFlip';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Contract address'));
    const openedContract = provider.open(CoinFlip.createFromAddress(address));

    await openedContract.sendPlay(provider.sender(), toNano('0.1'));
}
