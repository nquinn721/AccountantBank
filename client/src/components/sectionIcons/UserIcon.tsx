import { Person } from '@mui/icons-material';
import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';

const UserIcon: React.FC<SvgIconProps> = (props) => (
  <Person id="user-icon" {...props} />
);

export default UserIcon;
