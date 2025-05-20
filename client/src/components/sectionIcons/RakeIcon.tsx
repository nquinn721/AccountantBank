import { AccountBalance } from "@mui/icons-material";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

const RakeIcon: React.FC<SvgIconProps> = (props) => (
  <AccountBalance id="rake-icon" {...props} />
);

export default RakeIcon;
