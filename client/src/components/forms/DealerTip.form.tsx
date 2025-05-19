import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PlayerSearch from "./components/PlayerSearch";

interface DealerTipFormProps {
  onSubmit: (amount: number) => void;
}

const DealerTipForm: React.FC<DealerTipFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      onSubmit(amount);
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="dealer-tip-card modal-header">
        <AccountBalanceWalletIcon /> &nbsp; Dealer Tip
      </div>
      <div className="modal-content">
        <PlayerSearch />

        <label htmlFor="dealer-tip-amount">Tip Amount</label>
        <TextField
          id="dealer-tip-amount"
          type="number"
          value={amount}
          onChange={handleChange}
          required
        />
        <br />

        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Submit Tip
        </Button>
      </div>
    </form>
  );
};

export default DealerTipForm;
