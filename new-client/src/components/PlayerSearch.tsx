import { Box, SxProps, Theme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react';
import { IUser, userStore } from '../store/User.store';

const PlayerSearch = ({
  playerFound,
  newUser,
  onClear,
  sx = {},
}: {
  playerFound?: (player: IUser) => void;
  newUser?: (name: string) => void;
  onClear?: () => void;
  sx?: SxProps<Theme>;
}) => {
  const options = userStore.users || [];
  const label = 'Player Name';
  const placeholder = 'Search for a player...';
  const handleInputChange = (value: string) => {
    value = value.trim();
    if (value) {
      const foundUser = userStore.users.find(
        (user) => user.name.toLowerCase() === value.toLowerCase(),
      );
      if (foundUser) {
        console.log('player found', value, foundUser, value);
        playerFound?.(foundUser);
      } else {
        newUser?.(value);
      }
    } else {
      onClear?.();
    }
  };

  return (
    <Box className="player-search" sx={sx}>
      <Autocomplete
        className="player-search-autocomplete"
        options={options ? options.map((user) => user.name) : []}
        freeSolo
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
          />
        )}
        fullWidth
      />
    </Box>
  );
};

export default observer(PlayerSearch);
