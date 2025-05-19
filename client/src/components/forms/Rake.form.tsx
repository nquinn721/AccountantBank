import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PlayerSearch from "./components/PlayerSearch";
interface RakeFormProps {
  onSubmit: (amount: number, description: string) => void;
}

const RakeForm: React.FC<RakeFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(amount, description);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="rake-card modal-header">
        <AccountBalanceIcon /> &nbsp; Rake
      </div>
      <div className="modal-content">
        <PlayerSearch />

        <div>
          <label>
            Amount:
            <TextField
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <br />

        <div>
          <label>
            Description:
            <TextField
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <br />

        <Button variant="contained" type="submit" disabled={amount <= 0}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RakeForm;
