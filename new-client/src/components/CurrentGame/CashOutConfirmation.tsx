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

const CashOutConfirmation: React.FC<BuyInConfirmationProps> = ({
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
    <ConfirmBox
      open={open}
      onCancel={onCancel}
      title="Confirm Cash Out"
      message={
        <Box>
          Are you sure you want to cash out <b>${amount}</b> for{' '}
          <b>{player.name}</b>?
        </Box>
      }
      onConfirm={handleOnConfirm}
    />
  );
};

export default CashOutConfirmation;
