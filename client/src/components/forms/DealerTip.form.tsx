import { TextField, Button, Box, Tab } from "@mui/material";
import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { dealerTipStore } from "../../store/DealerTip.store";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { observer } from "mobx-react";
import DealerTipsTable from "./components/tables/DealerTipsTable";
import DealerTipIcon from "../sectionIcons/DealerTipIcon";

interface DealerTipFormProps {
  onSubmit: (amount: number) => void;
}

const DealerTipForm: React.FC<DealerTipFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [tabValue, setTabValue] = useState("1");
  const dealer = dealerTipStore.getDealer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      dealerTipStore.addDealerTip(amount);
      onSubmit(amount);
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="dealer-tip-card modal-header">
        <DealerTipIcon /> &nbsp; Dealer Tip
      </div>
      <div className="modal-content">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              aria-label="lab API tabs example"
              onChange={handleTabChange}
            >
              <Tab label="Add Tip" value="1" />
              <Tab label="Today's Tips" value="2" />
              <Tab label="All Tips" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="tab-content">
              {dealer ? (
                <Box
                  className={dealerTipStore.currentDealer ? "1" : ""}
                  sx={{
                    marginBottom: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 2,
                  }}
                >
                  <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    {dealer.name}
                  </Box>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      dealerTipStore.clearCurrentDealer();
                    }}
                  >
                    X
                  </Button>
                </Box>
              ) : (
                <PlayerSearch />
              )}
              <TextField
                type="number"
                label="Dealer Tip Amount"
                value={amount}
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
          </TabPanel>
          <TabPanel value="2">
            <div className="tab-content">
              <DealerTipsTable data={dealerTipStore.getTodayDealerTips()} />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <DealerTipsTable data={dealerTipStore.dealerTips} />
          </TabPanel>
        </TabContext>
      </div>
    </form>
  );
};

export default observer(DealerTipForm);
