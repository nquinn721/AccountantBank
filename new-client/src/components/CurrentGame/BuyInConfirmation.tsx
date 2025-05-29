import { Box } from '@mui/material';
import React from 'react';
import { transactionStore } from '../../store/Transaction.store';
import { IUser } from '../../store/User.store';
import ConfirmBox from '../ConfirmBox';

interface BuyInConfirmationProps {
  player: IUser;
  amount: number;
  onCancel: () => void;
}

const BuyInConfirmation: React.FC<BuyInConfirmationProps> = ({
  player,
  amount,
  onCancel,
}) => {
  return (
    <ConfirmBox // Buy in confirmation
      open={true}
      onCancel={() => onCancel()}
      title="Confirm Buy In"
      message={
        <Box>
          Are you sure you want to add a buy-in of <b>${amount}</b> for{' '}
          <b>{player.name}</b>?
        </Box>
      }
      onConfirm={() => {
        transactionStore.addTransaction({
          userId: player.id,
          type: 'borrow',
          amount,
        });
        onCancel();
      }}
    />
  );
};

export default BuyInConfirmation;
