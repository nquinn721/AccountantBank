import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { tipStore } from '../../store/Tip.store';
import ConfirmBox from '../ConfirmBox';
import DealerTipIcon from '../sectionIcons/DealerTipIcon';
import PlayerSearch from './components/PlayerSearch';
import FormHeader from './FormHeader';

interface DealerTipFormProps {
  onSubmit: (amount: number) => void;
}

const DealerTipForm: React.FC<DealerTipFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const dealer = tipStore.currentDealer;

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    tipStore.addTip(amount);
    onSubmit(amount);
    setAmount(0);
    setShowConfirm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0) {
      setShowConfirm(true);
    }
  };
  const handleCancel = () => {
    setShowConfirm(false);
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
        <ConfirmBox
          open={showConfirm}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Confirm Dealer Tip"
          message={
            <Box>
              Are you sure you want to give a tip of <b>${amount}</b> to{' '}
              <b>{dealer?.name}</b>?
            </Box>
          }
        />
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
