import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { observer } from "mobx-react";
import BuyInIcon from "../sectionIcons/BuyInIcon";
import PaymentTypeList from "./components/PaymentTypeList"; // Make sure the path is correct
interface BuyInFormProps {
  onSubmit: (amount: number) => void;
}

const BuyInForm: React.FC<BuyInFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isSettled, setSettled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      appStore.addPlayerTransaction("buyin", paymentMethod, isSettled, amount);
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
          defaultValue={amount}
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />
        <PaymentTypeList onSelect={setPaymentMethod} />
        <br />
        <FormControlLabel
          sx={{ marginLeft: 2 }}
          control={
            <Checkbox
              checked={isSettled}
              onChange={(e) => setSettled(e.target.checked)}
            />
          }
          label="Is Settled"
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
