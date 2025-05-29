import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { transactionStore } from '../../store/Transaction.store';
import { IUser } from '../../store/User.store';
import ConfirmBox from '../ConfirmBox';

interface PlayerInfoProps {
  player: IUser;
}

const PlayerInfoModal: React.FC<
  PlayerInfoProps & { open: boolean; onClose: () => void }
> = ({ player, open, onClose }) => {
  const [buyIn, setBuyIn] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState(false);

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
              setBuyIn(Number(e.target.value));
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '50%' }}
            disabled={buyIn <= 0}
            onClick={() => buyIn > 0 && setShowConfirm(true)}
          >
            Add Buy In
          </Button>
          <ConfirmBox
            open={showConfirm}
            onCancel={() => setShowConfirm(false)}
            title="Confirm Buy In"
            message={
              <Box>
                Are you sure you want to add a buy-in of <b>${buyIn}</b> for{' '}
                <b>{player.name}</b>?
              </Box>
            }
            onConfirm={() => {
              if (player?.id) {
                transactionStore.addTransaction({
                  userId: player.id,
                  type: 'borrow',
                  amount: buyIn,
                });
                setBuyIn(0);
                onClose();
                setShowConfirm(false);
              }
            }}
          />
        </Box>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          color="error"
          onClick={onClose}
        >
          Cash Out
        </Button>
      </Box>
    </Modal>
  );
};

export default observer(PlayerInfoModal);
