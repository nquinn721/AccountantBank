import { observer } from "mobx-react";
import React from "react";
import { appStore } from "../store/App.store";
import moment from "moment";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BackButton from "./components/BackButton";

const BuyInPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <BackButton />
      <h1>Buy In</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Is Settled</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appStore.players.flatMap((player) =>
              player.transactions
                .filter((tx) => tx.type === "buyin")
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      {transaction.isSettled ? "Settled" : "Pending"}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      {moment(transaction.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default observer(BuyInPage);
