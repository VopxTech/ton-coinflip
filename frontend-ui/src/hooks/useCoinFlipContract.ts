import { useEffect, useState } from "react";
import { CoinFlip } from "../contracts/CoinFlip";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import { toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useCoinFlipContract(
  contractAddress: string,
) {
  const client = useTonClient();
  const [contractData, setContractData] = useState<
    null | {
      balance: number;
    }
  >();

  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const coinFlipContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new CoinFlip(
      Address.parse(contractAddress),
    );
    return client.open(contract) as OpenedContract<CoinFlip>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!coinFlipContract) return;

      const val = await coinFlipContract.getBalance();
      setContractData({
        balance: val.balance,
      });

      console.log(`Updated at ${new Date()}`);
      await sleep(15000);
      getValue();
    }
    getValue();
  }, [coinFlipContract]);

  return {
    sendPlay: (bet: number) => {
      return coinFlipContract?.sendPlay(sender, toNano(bet));
    },
    ...contractData,
  };
}
