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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import userStore from "../store/User.store";

const CashOutPage: React.FC = () => {
  // Define columns and rows outside of JSX
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "payOut",
      headerName: "Pay Out",
      flex: 1,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "isSettled",
      headerName: "Is Settled",
      flex: 1,
      renderCell: (params) => (params.value ? "Settled" : "Pending"),
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "date", headerName: "Date", flex: 2 },
  ];

  const rows = userStore.users.flatMap((user) =>
    user.transactions
      .filter((tx) => tx.type === "cashout")
      .map((transaction) => ({
        id: transaction.id,
        name: user.name,
        amount: transaction.amount,
        payOut: transaction.payOut,
        isSettled: transaction.isSettled,
        type: transaction.type,
        date: moment(transaction.created_at).format("MMMM Do YYYY, h:mm:ss a"),
      }))
  );

  return (
    <Box sx={{ width: "100%" }}>
      <BackButton />
      <h1>Cash Out</h1>
      <TableContainer component={Paper}>
        <DataGrid rows={rows} columns={columns} />
      </TableContainer>
    </Box>
  );
};

export default observer(CashOutPage);
