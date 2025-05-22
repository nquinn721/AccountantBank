import { Button, Checkbox, TextField, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import PlayerSearch from './components/PlayerSearch';
import { observer } from 'mobx-react';
import BuyInIcon from '../sectionIcons/BuyInIcon';
import FormHeader from './FormHeader';
import transactionStore from '../../store/Transaction.store';
interface BuyInFormProps {
  onSubmit: (amount: number) => void;
}

const BuyInForm: React.FC<BuyInFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [isSettled, setSettled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      transactionStore.addUserTransaction({
        userName: playerName,
        type: 'buyin',
        isSettled: isSettled,
        amount: amount,
      });
      setAmount(0);
      onSubmit(amount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
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
