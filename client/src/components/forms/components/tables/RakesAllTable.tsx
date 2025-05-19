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
import { rakeStore } from "../../../../store/Rake.store";
import { observer } from "mobx-react";

const RakesAllTable: React.FC = () => {
  const rakes = rakeStore.rakes;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rakes.map((row) => (
            <TableRow key={row.id}>
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

export default observer(RakesAllTable);
