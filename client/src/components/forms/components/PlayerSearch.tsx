import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { appStore } from "../../../store/App.store";
import { observer } from "mobx-react";

interface PlayerOption {
  id: number;
  name: string;
}

const PlayerSearch = () => {
  const [playerName, setPlayerName] = useState("");
  const options = appStore.players;
  const label = "Player Name";
  const placeholder = "Search for a player...";

  const handleInputChange = (value: string) => {
    if (value) {
      setPlayerName(value);
      appStore.currentSearchedPlayerID =
        options.find((option) => option.name === value)?.id || null;
    }
  };

  return (
    <div className="player-search">
      <Autocomplete
        className="player-search-autocomplete"
        options={options}
        getOptionLabel={(option) => option.name}
        onInputChange={(_, newInputValue) => handleInputChange(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className="player-search-button"
        onClick={() => {
          appStore.AddPlayer(playerName);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default observer(PlayerSearch);
