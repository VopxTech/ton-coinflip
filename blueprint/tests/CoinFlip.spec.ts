import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Cell, toNano } from "@ton/core";
import { CoinFlip } from "../wrappers/CoinFlip";
import "@ton/test-utils";
import { compile } from "@ton/blueprint";

describe("CoinFlip", () => {
  let code: Cell;

  beforeAll(async () => {
    code = await compile("CoinFlip");
  });

  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let coinFlip: SandboxContract<CoinFlip>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();

    coinFlip = blockchain.openContract(
      CoinFlip.createFromConfig({ id: Math.floor(Date.now() / 1e3) }, code),
    );

    deployer = await blockchain.treasury("deployer");

    const deployResult = await coinFlip.sendDeploy(
      deployer.getSender(),
      toNano("0.05"),
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: coinFlip.address,
      deploy: true,
      success: true,
    });
  });

  it("should deploy", async () => {
    // the check is done inside beforeEach
    // blockchain and coinFlip are ready to use
  });

  it("successfully deposits funds", async () => {
    const senderWallet = await blockchain.treasury("sender");

    const depositMessageResult = await coinFlip.sendDeploy(
      senderWallet.getSender(),
      toNano("5"),
    );

    expect(depositMessageResult.transactions).toHaveTransaction({
      from: senderWallet.address,
      to: coinFlip.address,
      success: true,
    });

    const balance = await coinFlip.getBalance();

    expect(balance.balance).toBeGreaterThan(toNano("4.99"));
  });

  it("successfully plays the game", async () => {
    const senderWallet = await blockchain.treasury("sender");

    const depositMessageResult = await coinFlip.sendDeploy(
      senderWallet.getSender(),
      toNano("5"),
    );

    expect(depositMessageResult.transactions).toHaveTransaction({
      from: senderWallet.address,
      to: coinFlip.address,
      success: true,
    });

    const playMessageResult = await coinFlip.sendPlay(
      senderWallet.getSender(),
      toNano("1"),
    );

    expect(depositMessageResult.transactions).toHaveTransaction({
      from: senderWallet.address,
      to: coinFlip.address,
      success: true,
    });

    const balance = await coinFlip.getBalance();
    expect([4044977000, /* User wins */ 6047257000 /* User loses */]).toContain(
      balance.balance,
    );
  });
});
