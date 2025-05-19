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
  currentSearchedPlayerName: string = "";

  constructor() {
    makeAutoObservable(this);
    this.getPlayers();
  }
  // Example action to fetch players
  async getPlayers() {
    this.setLoading(true);
    try {
      const data = await this.get("/player");
      this.players = data;
    } catch (error) {
      this.setError("Failed to fetch players");
    } finally {
      this.setLoading(false);
    }
  }

  async AddPlayer() {
    const player = await this.post("/player", {
      name: this.currentSearchedPlayerName,
    });
    return player;
  }

  async AddPlayerTransaction(
    type: string,
    paytype: string = "cash",
    amount: number
  ) {
    let player = this.currentSearchedPlayerID;

    if (!this.currentSearchedPlayerID && this.currentSearchedPlayerName) {
      const p = await this.AddPlayer();
      player = p.id;
    }
    try {
      await this.post("/transaction", {
        player,
        type,
        paytype,
        amount,
      });
      this.currentSearchedPlayerID = null;
      this.currentSearchedPlayerName = "";
      this.getPlayers();
    } catch (error) {
      // Handle error if needed
    }
  }

  async get(url: string) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      return response.json();
    } catch (error) {
      this.setError("Failed to fetch data");
    }
  }

  async post(url: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      this.setError("Failed to post data");
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
