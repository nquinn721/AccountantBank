import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { observer } from "mobx-react";
import BuyInIcon from "../sectionIcons/BuyInIcon";
interface BuyInFormProps {
  onSubmit: (amount: number) => void;
}

const BuyInForm: React.FC<BuyInFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      appStore.addPlayerTransaction("buyin", "cash", amount);
      setAmount(0);
      onSubmit(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="buyin-card modal-header">
        <BuyInIcon /> &nbsp; Buy In
      </div>
      <div className="modal-content">
        <PlayerSearch />
        <TextField
          id="buyin-amount"
          type="number"
          value={amount}
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !appStore.currentSearchedPlayerName}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default observer(BuyInForm);
