import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, List, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import { tipStore } from '../store/Tip.store';
import { IUser } from '../store/User.store';
import ConfirmBox from './ConfirmBox';
import PlayerSearch from './PlayerSearch';

const typeColors = {
  info: '#2f86eb',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

const Tip: React.FC = () => {
  const [playerFound, setPlayerFound] = React.useState<IUser | null>(null);
  const [tip, setTip] = React.useState<number>(0);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <Grid
      size={{ xs: 12, md: 4 }}
      sx={{
        background: '#222',
        p: 3,
        height: '100%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: 25 }}>Rake</Box>
        <Box>Total: ${tipStore.totalAmount}</Box>
      </Box>
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 2,
          paddingY: 2,
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgb(24, 24, 24)',
            gap: 2,
            padding: 2,
            borderRadius: 1,
          }}
        >
          <PlayerSearch playerFound={setPlayerFound} sx={{ mb: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Tip Amount"
              value={tip || ''}
              size="small"
              sx={{ flexGrow: 1, mr: 1 }}
              onChange={(e) =>
                setTip(e.target.value === '' ? 0 : Number(e.target.value))
              }
            />
            <Button
              variant="contained"
              disabled={!playerFound || tip === null || tip <= 0}
              onClick={() => {
                if (playerFound && tip) setShowConfirm(true);
              }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
        <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {tipStore.currentTips.map((tip) => (
            <Box
              key={tip.id}
              sx={{
                backgroundColor: '#333',
                color: '#aaa',
                width: '100%',
                justifyContent: 'space-between',
                padding: 1,
                display: 'flex',
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              {tip.user?.name || 'Unknown User'}
              <span>{`$${tip.amount}`}</span>
              {moment(tip.created_at).format('h:mm a')}
            </Box>
          ))}
        </List>
        <ConfirmBox
          open={showConfirm}
          title="Add Tip?"
          message={`Add tip $${tip} for ${playerFound?.name || 'Unknown User'}?`}
          onConfirm={() => {
            tipStore.addTip({ user: playerFound, tip });
            setShowConfirm(false);
            setTip(0);
            setPlayerFound(null);
          }}
          onCancel={() => {
            setTip(0);
            setPlayerFound(null);
            setShowConfirm(false);
          }}
        />
      </Box>
    </Grid>
  );
};

export default observer(Tip);
