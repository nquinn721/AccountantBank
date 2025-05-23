import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import transactionStore from '../../store/Transaction.store';
import ConfirmBox from '../ConfirmBox';
import BuyInIcon from '../sectionIcons/BuyInIcon';
import PlayerSearch from './components/PlayerSearch';
import FormHeader from './FormHeader';
interface BuyInFormProps {
  onSubmit: (amount: number) => void;
}

const BuyInForm: React.FC<BuyInFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [isSettled, setSettled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { amount, playerName, isSettled });
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    transactionStore.addUserTransaction({
      userName: playerName,
      type: 'buyin',
      isSettled: isSettled,
      amount: amount,
    });
    setAmount(0);
    onSubmit(amount);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="modal-form">
      <FormHeader
        title="Buy In"
        className="buy-in-card"
        icon={<BuyInIcon />}
        href="buy-ins"
      />
      <div className="modal-content">
        <PlayerSearch playerFound={setPlayerName} />
        <TextField
          id="buyin-amount"
          type="number"
          defaultValue={amount}
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />
        <FormControlLabel
          sx={{ marginLeft: 2 }}
          control={
            <Checkbox
              checked={isSettled}
              onChange={(e) => setSettled(e.target.checked)}
            />
          }
          label="Is Settled"
        />
        <br />
        <ConfirmBox
          open={showConfirm}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title="Confirm Buy In"
          message={
            <Box>
              <p>Are you sure you want to buy in?</p>
              <Box>Player: {playerName}</Box>
              <Box>Amount: {amount}</Box>
              <Box>Settled: {isSettled ? 'Yes' : 'No'}</Box>
            </Box>
          }
        />
        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !playerName}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default observer(BuyInForm);
