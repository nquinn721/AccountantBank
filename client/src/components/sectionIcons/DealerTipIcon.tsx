import { AccountBalanceWallet } from "@mui/icons-material";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

const DealerTipIcon: React.FC<SvgIconProps> = (props) => (
  <AccountBalanceWallet id="dealer-tip-icon" {...props} />
);

export default DealerTipIcon;
