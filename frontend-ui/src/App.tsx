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
                  setBet(Number(e.target.value));
                }}
              />

              <p style={{ fontSize: "0.65em" }}>Min: 0.001 - Max: 1</p>

              <br></br>

              <button
                style={{ marginTop: "10px" }}
                onClick={() => {
                  if (bet < 0.001 || bet > 1) {
                    alert("Bet must be between 0.001 and 1 TON!");
                    return;
                  } else {
                    sendPlay(bet);
                  }
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
