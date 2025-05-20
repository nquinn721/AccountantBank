import { Card, Dialog } from "@mui/material";
import React, { useState } from "react";
import BuyInForm from "../components/forms/BuyIn.form";
import CashoutForm from "../components/forms/Cashout.form";
import DealerTipForm from "../components/forms/DealerTip.form";
import RakeForm from "../components/forms/Rake.form";
import {
  Savings,
  AccountBalanceWallet,
  AccountBalance,
} from "@mui/icons-material";
import BuyInIcon from "../components/sectionIcons/BuyInIcon";
import CashOutIcon from "../components/sectionIcons/CashOutIcon";
import DealerTipIcon from "../components/sectionIcons/DealerTipIcon";
import RakeIcon from "../components/sectionIcons/RakeIcon";
import { appStore } from "../store/App.store";
const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("buyin");
  const handleClose = () => {
    appStore.clearCurrentSearchedPlayer();
    setOpen(false);
  };
  const handleOpen = (form: string) => {
    setCurrentForm(form);
    setOpen(true);
  };
  return (
    <>
      <Card onClick={() => handleOpen("buyin")} className="buyin-card card">
        <BuyInIcon
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            fontSize: 150,
            opacity: 0.1,
          }}
        />
        <div>Buy In</div>
      </Card>
      <Card onClick={() => handleOpen("cashout")} className="card cashout-card">
        <CashOutIcon
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            fontSize: 150,
            opacity: 0.1,
          }}
        />
        <div>Cash Out</div>
      </Card>
      <Card
        onClick={() => handleOpen("dealerTip")}
        className="card dealer-tip-card"
      >
        <DealerTipIcon
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            fontSize: 150,
            opacity: 0.1,
          }}
        />
        <div>Dealer Tip</div>
      </Card>
      <Card onClick={() => handleOpen("rake")} className="card rake-card">
        <RakeIcon
          sx={{
            position: "absolute",
            top: 30,
            left: 30,
            fontSize: 150,
            opacity: 0.1,
          }}
        />
        <div>Rake</div>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {currentForm === "buyin" && <BuyInForm onSubmit={handleClose} />}
        {currentForm === "cashout" && <CashoutForm onSubmit={handleClose} />}
        {currentForm === "dealerTip" && (
          <DealerTipForm onSubmit={handleClose} />
        )}
        {currentForm === "rake" && <RakeForm onSubmit={handleClose} />}
      </Dialog>
    </>
  );
};

export default Home;
