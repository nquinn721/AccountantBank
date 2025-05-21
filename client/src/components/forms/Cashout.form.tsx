import { Box, Button, Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { observer } from "mobx-react";
import FormHeader from "./FormHeader";
import transactionStore from "../../store/Transaction.store";
import userStore, { IUser } from "../../store/User.store";
import CashOutIcon from "../sectionIcons/CashOutIcon";

interface CashoutFormProps {
  onSubmit: (amount: number) => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [payOut, setPayOut] = useState(0);
  const [playerName, setPlayerName] = useState<string>("");
  const buyIns = userStore.getPlayerBuyIns(playerName);
  const totalOwed = buyIns.reduce((acc, buyIn) => {
    if (!buyIn.isSettled) {
      return acc + buyIn.amount;
    }
    return acc;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && playerName) {
      transactionStore.cashOutPlayer({
        userName: playerName,
        type: "cashout",
        isSettled: true,
        amount,
        payOut,
      });
      setAmount(0);
      onSubmit(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="Cash Out"
        className="cash-out-card"
        icon={<CashOutIcon />}
        href="cash-outs"
      />
      <div className="modal-content">
        <PlayerSearch playerFound={setPlayerName} />
        <Box>
          <Box
            sx={{
              mb: 1,
            }}
          >
            Buy In's
          </Box>
          <Box
            sx={{
              mb: 1,
            }}
          >
            {playerName && (
              <Box>
                {buyIns.map((buyIn, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      {" "}
                      Settled <Checkbox checked={buyIn.isSettled} />
                    </Box>
                    <Box>${buyIn.amount}</Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "flex-end ",
                    borderTop: "1px solid #555",
                    paddingTop: 1,
                  }}
                >
                  {playerName}: ${totalOwed}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <br />
        <TextField
          type="number"
          defaultValue={amount}
          label={`${playerName || "Player"} is giving`}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setPayOut(Number(e.target.value) - totalOwed);
          }}
        />
        <br />
        <TextField
          disabled
          type="number"
          value={payOut}
          label="Pay Out Amount"
        />
        <br />

        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !playerName}
        >
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default observer(CashoutForm);
