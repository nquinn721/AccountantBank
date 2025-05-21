import { LocalAtm } from "@mui/icons-material";
import { Box, Button, Checkbox, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { CashAppIcon } from "./components/CashAppIcon";
import { ZelleIcon } from "./components/ZelleIcon";
import { PayPalIcon } from "./components/PayPalIcon";
import { VenmoIcon } from "./components/VenmoIcon";
import { observer } from "mobx-react";
import CashOutIcon from "../sectionIcons/CashOutIcon";
import PaymentTypeList from "./components/PaymentTypeList";
import FormHeader from "./FormHeader";

interface CashoutFormProps {
  onSubmit: (amount: number) => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [payOut, setPayOut] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const buyIns = appStore.getPlayerBuyIns(appStore.currentSearchedPlayerName);
  const totalOwed = buyIns.reduce((acc, buyIn) => {
    if (!buyIn.isSettled) {
      return acc + buyIn.amount;
    }
    return acc;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      appStore.cashOutPlayer("cashout", paymentMethod, true, amount, payOut);
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
        <PlayerSearch />
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
            {appStore.currentSearchedPlayerName &&
              buyIns.map((buyIn, idx) => (
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
              Owed: ${totalOwed}
            </Box>
          </Box>
        </Box>
        <br />
        <TextField
          type="number"
          defaultValue={amount}
          label={`${appStore.currentSearchedPlayerName} is giving`}
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
        {/* <PaymentTypeList onSelect={setPaymentMethod} /> */}

        <br />

        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !appStore.currentSearchedPlayerName}
        >
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default observer(CashoutForm);
