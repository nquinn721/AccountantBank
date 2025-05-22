import { TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { tipStore } from '../../store/Tip.store';
import PlayerSearch from './components/PlayerSearch';
import { observer } from 'mobx-react';
import DealerTipIcon from '../sectionIcons/DealerTipIcon';
import FormHeader from './FormHeader';

interface DealerTipFormProps {
  onSubmit: (amount: number) => void;
}

const DealerTipForm: React.FC<DealerTipFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const dealer = tipStore.currentDealer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      tipStore.addTip(amount);
      onSubmit(amount);
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <FormHeader
        title="Dealer Tip"
        icon={<DealerTipIcon />}
        className="dealer-tip-card"
        href="/dealer-tips"
      />
      <Box className="modal-content">
        {dealer ? (
          <Box
            className={tipStore.currentDealer ? '1' : ''}
            sx={{
              marginBottom: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 2,
            }}
          >
            <Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              {dealer.name}
            </Box>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                tipStore.clearCurrentDealer();
              }}
            >
              X
            </Button>
          </Box>
        ) : (
          <PlayerSearch
            playerFound={(player) => tipStore.setCurrentDealer(player)}
          />
        )}
        <TextField
          type="number"
          label="Dealer Tip Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <br />

        <Button
          variant="contained"
          type="submit"
          disabled={amount <= 0 || !dealer}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default observer(DealerTipForm);
