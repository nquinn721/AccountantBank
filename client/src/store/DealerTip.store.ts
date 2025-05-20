import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { BaseStore } from "./Store.base";
import moment from "moment";
import { appStore, Player } from "./App.store";
import { LogicHelper } from "./LogicHelper";
export interface DealerTip {
  id: number;
  amount: number;
  player: Player;
  created_at: Date;
}
class DealerTipStore extends BaseStore {
  dealerTips: DealerTip[] = [];
  url: string = "/dealer-tip";
  currentDealer: number | null = null;

  constructor() {
    super();
    makeObservable(this, {
      dealerTips: observable,
      getDealerTips: action,
      addDealerTip: action,
      currentDealer: observable,
      clearCurrentDealer: action,
      getTodayDealerTips: action,
      getDealer: action,
    });
    this.getDealerTips();
  }

  getAllTipAmounts() {
    return LogicHelper.GetAllAmounts(this.dealerTips);
  }

  getAllTipDates() {
    return LogicHelper.GetAllDates(this.dealerTips);
  }

  getDealer() {
    if (this.currentDealer) {
      return appStore.players.find(
        (player) => player.id === this.currentDealer
      );
    }
  }
  clearCurrentDealer() {
    this.currentDealer = null;
  }

  getTodayDealerTips() {
    const today = moment();
    return this.dealerTips.filter((tip) =>
      moment(tip.created_at).isSame(today, "day")
    );
  }

  async getDealerTips() {
    const data = await this.get(this.url);
    this.dealerTips = data;
  }

  async addDealerTip(amount: number) {
    this.currentDealer = appStore.currentSearchedPlayerID || null;
    await this.post(this.url, {
      amount,
      player: this.currentDealer || appStore.currentSearchedPlayerID,
    });
    this.getDealerTips();
  }

  getDealerTipsByPlayer(playerId: number) {
    return this.dealerTips.filter((tip) => tip.player.id === playerId);
  }

  getPlayerTipsByDate(playerId: number) {
    const playerTips = this.getDealerTipsByPlayer(playerId);
    const dates = LogicHelper.GetAllDates(playerTips);
    const amounts = LogicHelper.GetAllAmounts(playerTips);
    return { dates, amounts };
  }
}

export const dealerTipStore = new DealerTipStore();
