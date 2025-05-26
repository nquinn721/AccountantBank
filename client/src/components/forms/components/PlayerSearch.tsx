import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react';
import userStore, { IUser } from '../../../store/User.store';

const PlayerSearch = ({
  playerFound,
  onClear,
}: {
  playerFound?: (player: IUser) => void;
  onClear?: () => void;
}) => {
  const options = userStore.users || [];
  const label = 'Player Name';
  const placeholder = 'Search for a player...';
  const handleInputChange = (value: string) => {
    if (value) {
      const foundUser = options.find((user) => user.name === value);
      if (foundUser) {
        playerFound?.(foundUser);
      } else {
        onClear?.();
      }
    } else {
      onClear?.();
    }
  };

  return (
    <div className="player-search">
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
    </div>
  );
};

export default observer(PlayerSearch);
