import { makeObservable, observable, action } from "mobx";
import { BaseStore } from "./Store.base";
export interface Player {
  id: number;
  name: string;
  transactions: Array<{
    amount: number;
    date: Date;
  }>;
}

class AppStore extends BaseStore {
  players: Player[] = [];
  currentSearchedPlayerID: number | null = null;
  currentSearchedPlayerName: string = "";

  constructor() {
    super();
    makeObservable(this, {
      players: observable,
      currentSearchedPlayerID: observable,
      currentSearchedPlayerName: observable,
      getPlayers: action,
      addPlayer: action,
      addPlayerTransaction: action,
    });
    this.getPlayers();
  }
  // Example action to fetch players
  async getPlayers() {
    this.setLoading(true);
    const data = await this.get("/player");
    this.players = data;
  }

  async addPlayer() {
    const player = await this.post("/player", {
      name: this.currentSearchedPlayerName,
    });
    return player;
  }

  async addPlayerTransaction(
    type: string,
    paytype: string = "cash",
    amount: number
  ) {
    let player = this.currentSearchedPlayerID;

    if (!this.currentSearchedPlayerID && this.currentSearchedPlayerName) {
      const p = await this.addPlayer();
      player = p.id;
    }
    await this.post("/transaction", {
      player,
      type,
      paytype,
      amount,
    });
    this.currentSearchedPlayerID = null;
    this.currentSearchedPlayerName = "";
    this.getPlayers();
  }

  async DealerTip(amount: number) {
    this.post("/tipout", {
      amount,
    });
  }
}

export const appStore = new AppStore();
