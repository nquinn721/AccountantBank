import { observer } from "mobx-react";
import React from "react";
import { appStore } from "../store/App.store";
import moment from "moment";
import { Box } from "@mui/material";
import BackButton from "./components/BackButton";

const BuyInPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <BackButton />
      <h1>Buy In</h1>
      {appStore.players.map((player) => (
        <div key={player.id}>
          <h2>{player.name}</h2>
          {player.transactions.map((transaction) => (
            <div key={transaction.id}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Amount: ${transaction.amount}</Box>
                <Box>
                  Date:{" "}
                  {moment(transaction.created_at).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </Box>
              </Box>
            </div>
          ))}
        </div>
      ))}
    </Box>
  );
};

export default observer(BuyInPage);
