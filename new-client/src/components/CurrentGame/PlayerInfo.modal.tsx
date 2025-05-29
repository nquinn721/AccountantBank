import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { transactionStore } from '../../store/Transaction.store';
import { IUser } from '../../store/User.store';
import PaymentTypeList from '../icons/PaymentTypeList';
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
  const [paySource, setPaySource] = useState<string>('');

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

        <Box sx={{ gap: 1, mb: 3, mt: 2 }}>
          <TextField
            type="number"
            placeholder="Enter amount"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <PaymentTypeList onSelect={setPaySource} />
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
              onConfirm={() => {
                transactionStore.cashOut({
                  userId: player.id,
                  amount,
                  paySource,
                  playerOwed: player.moneyOwed || 0,
                });
                setShowCashOutConfirm(false);
                setAmount(0);
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
              onConfirm={() => {
                transactionStore.addTransaction({
                  userId: player.id,
                  type: 'borrow',
                  amount,
                  paySource,
                });
                setShowBuyInConfirm(false);
                setAmount(0);
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
