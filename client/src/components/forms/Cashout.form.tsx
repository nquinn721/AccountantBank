import { Box, Button, Checkbox, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import transactionStore from '../../store/Transaction.store';
import userStore from '../../store/User.store';
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
  const [playerName, setPlayerName] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const buyIns = userStore.getPlayerBuyIns(playerName);
  const totalOwed = buyIns.reduce((acc, buyIn) => {
    if (!buyIn.isSettled) {
      return acc + buyIn.amount;
    }
    return acc;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && playerName) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    transactionStore.cashOutPlayer({
      userName: playerName,
      type: 'cashout',
      isSettled: true,
      amount,
      payOut,
    });
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
        <PlayerSearch playerFound={setPlayerName} />
        <Box>
          <Box
            sx={{
              mb: 1,
            }}
          >
            Buy In's
          </Box>
          <Box
            sx={{
              mb: 1,
            }}
          >
            {playerName && (
              <Box>
                {buyIns.map((buyIn, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      {' '}
                      Settled <Checkbox checked={buyIn.isSettled} />
                    </Box>
                    <Box>${buyIn.amount}</Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'flex-end ',
                    borderTop: '1px solid #555',
                    paddingTop: 1,
                  }}
                >
                  {playerName}: ${totalOwed}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <br />
        <TextField
          type="number"
          defaultValue={amount}
          label={`${playerName || 'Player'} is giving`}
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
              Are you sure you want to cash out <b>{playerName}</b> for{' '}
              <b>${amount}</b>?
            </Box>
          }
        />
        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !playerName}
        >
          Cash Out
        </Button>
      </div>
    </form>
  );
};

export default observer(CashoutForm);
