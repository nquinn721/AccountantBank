import { makeObservable, observable, action } from "mobx";
import { BaseStore } from "./Store.base";
import moment from "moment";
export interface Player {
  id: number;
  name: string;
  transactions: Array<{
    id: number;
    amount: number;
    type: string; // "buyin" | "cashout"
    created_at: Date;
    isSettled: boolean;
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

  getPlayerBuyIns(name: string) {
    const player = this.players.find((p) => p.name === name);
    console.log("Player", player);
    return player
      ? player.transactions.filter(
          (t) =>
            t.type === "buyin" && moment(t.created_at).isSame(moment(), "day")
        )
      : [];
  }

  async cashOutPlayer(
    type: string,
    paytype: string = "cash",
    isSettled: boolean = false,
    amount: number,
    payOut: number = 0
  ) {
    const player = this.players.find(
      (p) => p.id === this.currentSearchedPlayerID
    );
    if (!player) {
      throw new Error("Player not found");
    }
    player.transactions.forEach(async (transaction) => {
      if (transaction.type === "buyin" && !transaction.isSettled) {
        await this.put(`/transaction/${transaction.id}`, {
          isSettled: true,
        });
      }
    });
    this.addPlayerTransaction(type, paytype, isSettled, amount, payOut);
  }

  async addPlayerTransaction(
    type: string,
    paytype: string = "cash",
    isSettled: boolean = false,
    amount: number,
    payOut: number = 0
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
      isSettled,
      payOut,
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

  clearCurrentSearchedPlayer() {
    this.currentSearchedPlayerID = null;
    this.currentSearchedPlayerName = "";
  }
}

export const appStore = new AppStore();
