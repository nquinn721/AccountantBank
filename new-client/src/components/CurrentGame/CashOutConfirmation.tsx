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

const CashOutConfirmation: React.FC<BuyInConfirmationProps> = ({
  player,
  amount,
  onCancel,
}) => {
  const playerOwed = player.moneyOwed || 0;
  return (
    <ConfirmBox
      open={true}
      onCancel={onCancel}
      title="Confirm Cash Out"
      message={
        <Box>
          Are you sure you want to cash out <b>${amount}</b> for{' '}
          <b>{player.name}</b>?
        </Box>
      }
      onConfirm={() => {
        console.log({ amount, playerOwed });
        if (playerOwed > 0) {
          transactionStore.addTransaction({
            userId: player.id,
            type: 'paid',
            amount: playerOwed < amount ? playerOwed : amount,
          });
        }

        transactionStore.addTransaction({
          userId: player.id,
          type: 'cashout',
          amount,
          cashOutPaid: amount > playerOwed ? amount - playerOwed : 0, // Cash out minus what they owe
        });
        onCancel();
      }}
    />
  );
};

export default CashOutConfirmation;
