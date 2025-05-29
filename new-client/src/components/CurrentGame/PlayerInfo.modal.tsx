import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { IUser } from '../../store/User.store';
import BuyInConfirmation from './BuyInConfirmation';
import CashOutConfirmation from './CashOutConfirmation';

interface PlayerInfoProps {
  player: IUser;
}

const PlayerInfoModal: React.FC<
  PlayerInfoProps & { open: boolean; onClose: () => void }
> = ({ player, open, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [showBuyInConfirm, setShowBuyInConfirm] = useState(false);
  const [showCashOutConfirm, setShowCashOutConfirm] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal">
        <Box sx={{ fontWeight: 700, fontSize: 20, mb: 2, textAlign: 'center' }}>
          {player.name || 'Unknown Player'}
        </Box>

        <Box
          sx={{
            mt: 1,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <strong>Buy In:</strong> ${player.totalBuyIn}
          </Box>
          <Box>
            <strong>Owes:</strong>{' '}
            {player?.moneyOwed != null ? `$${player.moneyOwed}` : '--'}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <TextField
            type="number"
            placeholder="Enter buy in"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <Button
            variant="contained"
            sx={{ flex: 1 }}
            color="primary"
            disabled={amount <= 0}
            onClick={() => amount > 0 && setShowBuyInConfirm(true)}
          >
            Add Buy In
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={amount <= 0}
            sx={{ flex: 1 }}
            onClick={() => amount > 0 && setShowCashOutConfirm(true)}
          >
            Cash Out
          </Button>
          {showCashOutConfirm && (
            <CashOutConfirmation
              player={player}
              amount={amount}
              onCancel={() => {
                setShowCashOutConfirm(false);
                onClose();
              }}
            />
          )}
          {showBuyInConfirm && (
            <BuyInConfirmation
              player={player}
              amount={amount}
              onCancel={() => {
                setShowBuyInConfirm(false);
                onClose();
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default observer(PlayerInfoModal);
