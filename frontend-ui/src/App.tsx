import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCoinFlipContract } from "./hooks/useCoinFlipContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { useState } from "react";

function App() {
  const { connected } = useTonConnect();

  const [bet, setBet] = useState(0.05);

  const { balance, sendPlay } = useCoinFlipContract(
    "EQCuWDIPWO6fGDN7w4ZpwNtBTEjl6_shllCJnfZptcoWgV-l" // Contract address
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function proxySetBet(e: any) {
    let value = parseFloat(e.target.value);
    if (value > 1) {
      value = 1;
    } else if (value < 0.001) {
      value = 0.001;
    }
    setBet(value);
  }

  return (
    <div>
      <div>
        <TonConnectButton
          style={{ position: "fixed", top: "10px", right: "20px" }}
        />
      </div>
      <div>
        <div className="Card">
          <h1>CoinFlip Faucet </h1>
          <div style={{}}>
            <h4 style={{ marginBottom: "2px" }}>
              Get a chance to double your testnet TONs.
            </h4>
            <h5 style={{ marginTop: "2px", color: "grey" }}>
              Or lose them all.
            </h5>
          </div>
          {(connected && (
            <>
              <b>Contract Balance</b>
              <div style={{ color: "darkgray" }}>{`${
                Number(balance) / 1000000000
              } TON`}</div>
              <br></br>

              <b>Your wager:</b>

              <br></br>

              <input
                type="number"
                value={bet}
                onChange={(e) => {
                  proxySetBet(e);
                }}
              />

              <p style={{ fontSize: "0.65em" }}>Mix: 0.001 - Max: 1</p>

              <br></br>

              <button
                style={{ marginTop: "10px" }}
                onClick={() => {
                  sendPlay(bet);
                }}
              >
                Send 🤞
              </button>
            </>
          )) || <div>Connect your wallet and reload the app.</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
