import { Sell } from "@mui/icons-material";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

const CashOutIcon: React.FC<SvgIconProps> = (props) => (
  <Sell id="cashout-icon" {...props} />
);

export default CashOutIcon;
