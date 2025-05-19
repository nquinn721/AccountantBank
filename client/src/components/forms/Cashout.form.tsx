import { LocalAtm, Savings } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { CashAppIcon } from "./components/CashAppIcon";
import { ZelleIcon } from "./components/ZelleIcon";
import { PayPalIcon } from "./components/PayPalIcon";
import { VenmoIcon } from "./components/VenmoIcon";
import { observer } from "mobx-react";

interface CashoutFormProps {
  onSubmit: (amount: number) => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      appStore.AddPlayerTransaction("cashout", paymentMethod, amount);
      setAmount(0);
      onSubmit(amount);
    }
  };

  console.log(appStore.currentSearchedPlayerName);

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="cashout-card modal-header">
        <Savings /> &nbsp; Cash Out
      </div>
      <div className="modal-content">
        <PlayerSearch />

        <TextField
          type="number"
          value={amount}
          label="Cash Out Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <br />

        <TextField
          select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          label="Payment Method"
          required
        >
          <MenuItem value={"cash"}>
            <LocalAtm />
            Cash
          </MenuItem>
          <MenuItem value={"zelle"}>
            <ZelleIcon />
            Zelle
          </MenuItem>
          <MenuItem value={"paypal"}>
            <PayPalIcon />
            PayPal
          </MenuItem>
          <MenuItem value={"venmo"}>
            <VenmoIcon />
            Venmo
          </MenuItem>
          <MenuItem value={"cashapp"}>
            <CashAppIcon />
            Cash App
          </MenuItem>
        </TextField>
        <br />

        <Button
          variant="contained"
          type="submit"
          disabled={
            amount <= 0 || !paymentMethod || !appStore.currentSearchedPlayerName
          }
        >
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default observer(CashoutForm);
