import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import transactionStore from '../../store/Transaction.store';
import { IUser } from '../../store/User.store';
import ConfirmBox from '../ConfirmBox';
import CashOutIcon from '../sectionIcons/CashOutIcon';
import PlayerSearch from './components/PlayerSearch';
import FormHeader from './FormHeader';

interface CashoutFormProps {
  onSubmit: (amount: number) => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [payOut, setPayOut] = useState(0);
  const [player, setPlayer] = useState<IUser | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [totalOwed, setTotalOwed] = useState(0);

  useEffect(() => {
    const fetchOwed = async () => {
      if (player) {
        const owed = await transactionStore.getMoneyOwed(player.id);
        setTotalOwed(owed);
      }
    };
    fetchOwed();
  }, [player]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && player?.name) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    transactionStore.addUserTransaction({
      userId: player!.id,
      type: 'cashout',
      amount,
      cashOutPaid: amount - totalOwed,
    });
    if (totalOwed) {
      transactionStore.addUserTransaction({
        userId: player!.id,
        type: 'paid',
        amount: totalOwed - amount < 0 ? totalOwed - amount : amount,
      });
    }
    setAmount(0);
    onSubmit(amount);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="Cash Out"
        className="cash-out-card"
        icon={<CashOutIcon />}
        href="cash-outs"
      />
      <div className="modal-content">
        <PlayerSearch playerFound={setPlayer} />
        {player?.name && (
          <Box>
            {player.name} owes: ${totalOwed}
          </Box>
        )}
        <br />
        <TextField
          type="number"
          defaultValue={amount}
          label={`${player?.name || 'Player'} is giving`}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setPayOut(Number(e.target.value) - totalOwed);
          }}
        />
        <br />
        <TextField
          disabled
          type="number"
          value={payOut}
          label="Pay Out Amount"
        />
        <br />
        <ConfirmBox
          open={showConfirm}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Confirm Cash Out"
          message={
            <Box>
              Are you sure you want to cash out <b>{player?.name}</b> for{' '}
              <b>${amount}</b>?
            </Box>
          }
        />
        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !player}
        >
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default observer(CashoutForm);
