import { Box } from '@mui/material';
import React from 'react';
import { IUser } from '../../store/User.store';
import ConfirmBox from '../ConfirmBox';

interface BuyInConfirmationProps {
  player: IUser;
  amount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

const BuyInConfirmation: React.FC<BuyInConfirmationProps> = ({
  player,
  amount,
  onCancel,
  onConfirm,
}) => {
  const [open, setOpen] = React.useState(true);
  const handleOnConfirm = () => {
    onConfirm();
    setOpen(false);
  };
  return (
    <ConfirmBox // Buy in confirmation
      open={open}
      onCancel={() => onCancel()}
      title="Confirm Buy In"
      message={
        <Box>
          Are you sure you want to add a buy-in of <b>${amount}</b> for{' '}
          <b>{player.name}</b>?
        </Box>
      }
      onConfirm={handleOnConfirm}
    />
  );
};

export default BuyInConfirmation;
