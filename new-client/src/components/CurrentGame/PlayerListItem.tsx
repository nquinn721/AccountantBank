import { Box, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { IUser } from '../../store/User.store';

interface PlayerListItemProps {
  player: IUser;
  onClick?: () => void;
}

const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, onClick }) => {
  return (
    <ListItem
      key={player.id}
      onClick={onClick}
      sx={{
        background: '#181818',
        color: '#fff',
        borderRadius: 2,
        cursor: 'pointer',
        mb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.29)',
      }}
    >
      <Box>
        <ListItemText primary={player.name ?? player.id} />
        <Box sx={{ fontSize: '14px' }}>
          Buy In:{' '}
          <span style={{ color: 'green' }}>${player.totalBuyIn ?? 0}</span>
        </Box>
      </Box>
      <Box>
        <Box sx={{ fontSize: '12px' }}>Owes: ${player.moneyOwed}</Box>
        <Box>Text</Box>
      </Box>
    </ListItem>
  );
};

export default PlayerListItem;
