import { makeAutoObservable } from "mobx";
interface Player {
  id: number;
  name: string;
  buyIns: Array<{
    amount: number;
    date: Date;
  }>;
}

class AppStore {
  // Example state
  isLoading: boolean = false;
  error: string | null = null;
  baseUrl: string = "http://localhost:8080";
  players: Player[] = [];
  currentSearchedPlayerID: number | null = null;

  constructor() {
    makeAutoObservable(this);
    this.getPlayers();
  }
  // Example action to fetch players
  async getPlayers() {
    this.setLoading(true);
    try {
      const response = await fetch(`${this.baseUrl}/player`);
      const data = await response.json();
      this.players = data;
    } catch (error) {
      this.setError("Failed to fetch players");
    } finally {
      this.setLoading(false);
    }
  }

  async AddPlayer(name: string) {
    const playerNames = this.players.map((player) => player.name);
    if (playerNames.includes(name)) {
      this.setError("Player already exists");
      return;
    }
    if (!name.trim()) return;
    try {
      const response = await fetch(`${this.baseUrl}/player`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      this.getPlayers();
    } catch (error) {
      // Handle error if needed
    }
  }

  async AddPlayerBuyIn(player: number, amount: number) {
    try {
      const response = await fetch(`${this.baseUrl}/buyIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player, amount, paid: 0 }),
      });
    } catch (error) {
      // Handle error if needed
    }
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(message: string | null) {
    this.error = message;
  }
}

export const appStore = new AppStore();
