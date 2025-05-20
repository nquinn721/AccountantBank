import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { appStore } from "../../../store/App.store";
import { observer } from "mobx-react";

interface PlayerOption {
  id: number;
  name: string;
}

const PlayerSearch = ({
  playerFound,
}: {
  playerFound?: (player: PlayerOption) => void;
}) => {
  const options = appStore.players || [];
  const label = "Player Name";
  const placeholder = "Search for a player...";
  const handleInputChange = (value: string) => {
    if (value) {
      const player = options.find((option) => option.name === value);
      if (player) {
        appStore.currentSearchedPlayerID = player.id;
        appStore.currentSearchedPlayerName = player.name;
        playerFound?.(player);
      } else {
        appStore.currentSearchedPlayerID = null;
        appStore.currentSearchedPlayerName = value;
      }
    }
  };

  return (
    <div className="player-search">
      <Autocomplete
        className="player-search-autocomplete"
        options={options.map((option) => option.name)}
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
      {/* <Button
        variant="contained"
        color="primary"
        className="player-search-button"
        onClick={() => {
          appStore.AddPlayer(playerName);
        }}
      >
        +
      </Button> */}
    </div>
  );
};

export default observer(PlayerSearch);
