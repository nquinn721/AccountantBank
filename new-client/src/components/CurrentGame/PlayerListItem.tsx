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
      sx={{
        background: '#181818',
        color: '#fff',
        borderRadius: 2,
        mb: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.29)',
      }}
    >
      <ListItemText primary={player.name ?? player.id} />
      <Box sx={{ color: 'green' }}>${player.transactions?.[0].amount}</Box>
    </ListItem>
  );
};

export default PlayerListItem;
