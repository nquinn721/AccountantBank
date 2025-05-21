import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Tab } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { rakeStore } from "../../store/Rake.store";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import RakesTable from "./components/tables/RakesTable";
import RakeIcon from "../sectionIcons/RakeIcon";
import FormHeader from "./FormHeader";
import DefaultDenominations from "./components/DefaultDenominations";
interface RakeFormProps {
  onSubmit: (amount: number) => void;
}

const RakeForm: React.FC<RakeFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [tabValue, setTabValue] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rakeStore.addRake(amount);
    onSubmit(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="Rake"
        icon={<RakeIcon />}
        className="rake-card"
        href="/rakes"
      />
      <Box className="modal-content">
        <Box className="tab-content">
          <DefaultDenominations onChange={setAmount} />
          <br />
          <TextField
            type="number"
            label="Rake Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <br />
          <Button variant="contained" type="submit" disabled={amount <= 0}>
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RakeForm;
