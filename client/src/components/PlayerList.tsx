import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { appStore } from "../store/App.store";
import { observer } from "mobx-react";
import { Button, Input } from "@mui/material";

function PlayerList() {
  const [buyInAmount, setBuyInAmount] = useState(0);
  const { players } = appStore;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Buy Ins</TableCell>
            <TableCell>Add new buy in</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell>
                {player.buyIns.map((buyIn) => (
                  <div key={buyIn.date.toString()}>
                    {buyIn.amount} on {buyIn.date.toString()}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Enter buy in amount"
                  onChange={(e) => {
                    const amount = parseFloat(e.target.value);
                    if (!isNaN(amount)) {
                      setBuyInAmount(amount);
                    }
                  }}
                  sx={{ mr: 1 }}
                />
                <Button
                  onClick={() => {
                    appStore.AddPlayerBuyIn(player.id, buyInAmount);
                  }}
                  variant="outlined"
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default observer(PlayerList);
