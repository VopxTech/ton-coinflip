import { toNano } from '@ton/core';
import { CoinFlip } from '../wrappers/CoinFlip';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const coinFlip = provider.open(
        CoinFlip.createFromConfig(
            {
                id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
            },
            await compile('CoinFlip'),
        ),
    );

    await coinFlip.sendDeploy(provider.sender(), toNano('0.5'));
}
