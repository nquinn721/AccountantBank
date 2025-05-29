import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { transactionStore } from '../store/Transaction.store';
import { IUser, userStore } from '../store/User.store';
import ConfirmBox from './ConfirmBox';
import PlayerSearch from './PlayerSearch';
import PaymentTypeList from './icons/PaymentTypeList';

const AddNewPlayer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [player, setPlayer] = useState<IUser | null>(null);
  const [newPlayer, setNewPlayer] = useState<string | null>(null);
  const [buyin, setBuyin] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paySource, setPaySource] = useState<string>('cash');

  const handleSubmit = async () => {
    let p = player;
    if (newPlayer) p = await userStore.addUser(newPlayer);
    transactionStore.addTransaction({
      userId: p ? Number(p.id) : 0,
      type: 'borrow',
      amount: buyin,
      paySource,
    });
    setPlayer(null);
    setBuyin(0);
    setShowConfirm(false);
    userStore.getCurrentPlayers(); // Refresh the current players list
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal">
        <Box sx={{ mb: 2, fontWeight: 'bold', fontSize: 20 }}>
          Add New Player
        </Box>
        <Box sx={{ mb: 4 }}>
          <PlayerSearch
            playerFound={(user) => {
              setPlayer(user);
              setNewPlayer(null);
            }}
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
            sx={{ mb: 2 }}
            autoFocus
            label="Buy-in Amount"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={buyin}
            onChange={(e) => setBuyin(Number(e.target.value))}
          />
          <PaymentTypeList onSelect={setPaySource} />
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
