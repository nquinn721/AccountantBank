import { Card, Dialog } from "@mui/material";
import React, { useState } from "react";
import BuyInForm from "../components/forms/BuyIn.form";
import CashoutForm from "../components/forms/Cashout.form";
import DealerTipForm from "../components/forms/DealerTip.form";
import RakeForm from "../components/forms/Rake.form";
import {
  AddShoppingCart,
  Savings,
  AccountBalanceWallet,
  AccountBalance,
} from "@mui/icons-material";
const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("buyin");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (form: string) => {
    setCurrentForm(form);
    setOpen(true);
  };
  return (
    <div className="app">
      <header>
        <img
          src="poker-chip.png"
          alt="Logo"
          width={40}
          height={40}
          style={{ marginRight: "10px" }}
        />
        Poker
      </header>
      <div className="content">
        <Card onClick={() => handleOpen("buyin")} className="buyin-card card">
          <AddShoppingCart
            id="buyin-icon"
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
        <Card
          onClick={() => handleOpen("cashout")}
          className="card cashout-card"
        >
          <Savings
            id="cashout-icon"
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
          <AccountBalanceWallet
            id="dealerTip-icon"
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
          <AccountBalance
            id="rake-icon"
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
      </div>
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
    </div>
  );
};

export default Home;
