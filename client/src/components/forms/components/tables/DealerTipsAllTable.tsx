import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { observer } from "mobx-react";
import { dealerTipStore } from "../../../../store/DealerTip.store";

const DealerTipsAllTable: React.FC = () => {
  const dealerTips = dealerTipStore.dealerTips;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dealer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dealerTips.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.player.name}</TableCell>
              <TableCell>${row.amount}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(row.created_at)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(DealerTipsAllTable);
