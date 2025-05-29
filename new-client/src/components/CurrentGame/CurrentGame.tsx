import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Button, Grid, List, ListItemText } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import type { IUser } from '../../store/User.store';
import { userStore } from '../../store/User.store';
import AddNewPlayer from '../AddNewPlayer.modal';
import PlayerInfoModal from './PlayerInfo.modal';
import PlayerListItem from './PlayerListItem';

const CurrentGame: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [currentPlayers, setCurrentPlayers] = React.useState<IUser[]>(
    userStore.currentPlayers,
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<IUser | null>(null);

  useEffect(() => {
    setCurrentPlayers(userStore.currentPlayers);
    console.log('SETTING CURRENT PLAYERS');
  }, [userStore.currentPlayers]);

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{ background: '#222', p: 3, borderRadius: 2 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <ListItemText
          primary="Current Game"
          primaryTypographyProps={{ variant: 'h5', sx: { color: '#fff' } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Button>
        <AddNewPlayer open={open} onClose={() => setOpen(false)} />
      </Box>
      {currentPlayers.length ? (
        <List
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
            paddingTop: 2,
            paddingX: 2,
          }}
        >
          {currentPlayers?.map((player) => (
            <PlayerListItem
              onClick={() => {
                console.log('Player clicked:', player);
                setCurrentPlayer(player);
              }}
              key={player.id}
              player={player}
            />
          ))}
        </List>
      ) : (
        <Box
          sx={{
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 2,
          }}
        >
          <Box>
            <PeopleAltIcon
              sx={{
                fontSize: 150,
                color: 'rgba(255, 255, 255, 0.1)',
                position: 'absolute',
                top: 100,
                left: '22%',
              }}
            />
            <Box sx={{ color: 'rgba(255, 255, 255, 0.3)', mt: 2 }}>
              No players currently in the game.
            </Box>
          </Box>
        </Box>
      )}
      <PlayerInfoModal
        player={currentPlayer || ({} as IUser)}
        open={currentPlayer !== null}
        onClose={() => setCurrentPlayer(null)}
      />
    </Grid>
  );
};

export default observer(CurrentGame);
