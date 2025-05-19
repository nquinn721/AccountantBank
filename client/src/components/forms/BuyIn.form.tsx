import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { AddShoppingCart } from "@mui/icons-material";
import { appStore } from "../../store/App.store";
interface BuyInFormProps {
  onSubmit: (amount: number) => void;
}

const BuyInForm: React.FC<BuyInFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      setAmount(0);
      onSubmit(amount);
      if (appStore.currentSearchedPlayerID) {
        appStore.AddPlayerBuyIn(appStore.currentSearchedPlayerID, amount);
      }
      appStore.currentSearchedPlayerID = null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="buyin-card modal-header">
        <AddShoppingCart /> &nbsp; Buy In
      </div>
      <div className="modal-content">
        <PlayerSearch />
        <TextField
          id="buyin-amount"
          type="number"
          variant="filled"
          value={amount}
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />
        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default BuyInForm;
