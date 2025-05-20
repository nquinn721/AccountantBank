import { TextField, Button, Box, styled } from "@mui/material";
import React, { useState } from "react";
import { dealerTipStore } from "../../store/DealerTip.store";
import PlayerSearch from "./components/PlayerSearch";
import { appStore } from "../../store/App.store";
import { observer } from "mobx-react";
import DealerTipIcon from "../sectionIcons/DealerTipIcon";
import FormHeader from "./FormHeader";

interface DealerTipFormProps {
  onSubmit: (amount: number) => void;
}

const DealerTipForm: React.FC<DealerTipFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const dealer = dealerTipStore.getDealer();
  console.log("DealerTipForm dealer", dealer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
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
      <FormHeader
        title="Dealer Tip"
        icon={<DealerTipIcon />}
        className="dealer-tip-card"
        href="/dealer-tips"
      />
      <Box className="modal-content">
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
          defaultValue={amount}
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
      </Box>
    </form>
  );
};

export default observer(DealerTipForm);
