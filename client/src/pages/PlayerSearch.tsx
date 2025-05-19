import React, { use, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { appStore } from "../store/App.store";
import PlayerList from "../components/PlayerList";

const PlayerSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const { players } = appStore;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <div>
      <h1>Player Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a player..."
        />
        <button type="submit">Search</button>
      </form>
      <PlayerList />
    </div>
  );
};

export default observer(PlayerSearch);
