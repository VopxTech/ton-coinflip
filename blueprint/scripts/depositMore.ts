import { Address, toNano } from '@ton/core';
import { CoinFlip } from '../wrappers/CoinFlip';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const coinFlip = provider.open(CoinFlip.createFromAddress(Address.parse('ENTER_ADDRESS_HERE')));

    await coinFlip.sendDeploy(provider.sender(), toNano('ENTER_AMOUNT_HERE'));
}
