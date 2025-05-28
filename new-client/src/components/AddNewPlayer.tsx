import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { transactionStore } from '../store/Transaction.store';
import { IUser, userStore } from '../store/User.store';
import ConfirmBox from './ConfirmBox';
import PlayerSearch from './PlayerSearch';

const AddNewPlayer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [player, setPlayer] = useState<IUser | null>(null);
  const [newPlayer, setNewPlayer] = useState<string | null>(null);
  const [buyin, setBuyin] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    let p = player;
    if (newPlayer) p = await userStore.addUser(newPlayer);
    transactionStore.addTransaction({
      userId: p ? Number(p.id) : 0,
      type: 'borrow',
      amount: buyin,
    });
    setPlayer(null);
    setBuyin(0);
    setShowConfirm(false);
    userStore.getCurrentPlayers(); // Refresh the current players list
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 2, fontWeight: 'bold', fontSize: 20 }}>
          Add New Player
        </Box>
        <Box sx={{ mb: 4 }}>
          <PlayerSearch
            playerFound={setPlayer}
            newUser={(name) => {
              setNewPlayer(name);
              setPlayer(null);
            }}
            onClear={() => {
              setPlayer(null);
              setNewPlayer(null);
            }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <TextField
            autoFocus
            label="Buy-in Amount"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={buyin}
            onChange={(e) => setBuyin(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <ConfirmBox
            open={showConfirm}
            title="Confirm Add Player"
            message={
              newPlayer ? (
                <Box>
                  Are you sure you want to add a new player <b>{newPlayer}</b>{' '}
                  with buy-in <b>${buyin}</b>?
                </Box>
              ) : (
                <Box>
                  Are you sure you want to add <b>{player?.name}</b> with buy-in{' '}
                  <b>${buyin}</b>?
                </Box>
              )
            }
            onConfirm={handleSubmit}
            onCancel={() => setShowConfirm(false)}
          />
          <Button
            onClick={() => setShowConfirm(true)}
            color="primary"
            variant="contained"
            disabled={(!player && !newPlayer) || buyin <= 0}
          >
            Add
          </Button>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewPlayer;
