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
  currentDealer: Player | null = null;

  constructor() {
    super();
    makeObservable(this, {
      dealerTips: observable,
      getDealerTips: action,
      addDealerTip: action,
      currentDealer: observable,
      clearCurrentDealer: action,
      getTodayDealerTips: action,
      setCurrentDealer: action,
    });
    this.getDealerTips();
  }

  getAllTipAmounts() {
    return LogicHelper.GetAllAmounts(this.dealerTips);
  }

  getAllTipDates() {
    return LogicHelper.GetAllDates(this.dealerTips);
  }

  setCurrentDealer(dealer: Player) {
    this.currentDealer = dealer;
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
