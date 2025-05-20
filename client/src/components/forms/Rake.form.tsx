import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Tab } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { rakeStore } from "../../store/Rake.store";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Box from "@mui/material/Box";
import RakesTable from "./components/tables/RakesTable";
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
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="rake-card modal-header">
        <AccountBalanceIcon /> &nbsp; Rake
      </div>
      <div className="modal-content">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              aria-label="lab API tabs example"
              onChange={handleTabChange}
            >
              <Tab label="Add Rake" value="1" />
              <Tab label="Rakes Today" value="2" />
              <Tab label="All Rakes" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="tab-content">
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
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="tab-content">
              <RakesTable data={rakeStore.getTodayRakes()} />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <RakesTable data={rakeStore.rakes} />
          </TabPanel>
        </TabContext>
      </div>
    </form>
  );
};

export default RakeForm;
