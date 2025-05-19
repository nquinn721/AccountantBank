import { Savings } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";

interface CashoutFormProps {
  onSubmit: (amount: number) => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      setAmount(0);
      onSubmit(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="cashout-card modal-header">
        <Savings /> &nbsp; Cash Out
      </div>
      <div className="modal-content">
        <PlayerSearch />

        <label>
          Cashout Amount:
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            variant="filled"
            sx={{ color: "white" }}
          />
        </label>
        <br />

        <label>
          Cashout Amount:
          <TextField
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            variant="filled"
            sx={{ color: "white" }}
          />
        </label>
        <br />

        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default CashoutForm;
