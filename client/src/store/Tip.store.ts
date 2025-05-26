import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';
import { LogicHelper } from './LogicHelper';
import { BaseStore } from './Store.base';
import userStore, { IUser } from './User.store';

export interface ITip {
  id: number;
  amount: number;
  user: IUser;
  created_at: Date;
}
class TipStore extends BaseStore {
  tips: ITip[] = [];
  url: string = '/tip';
  currentDealer: IUser | null = null;

  constructor() {
    super();
    makeObservable(this, {
      tips: observable,
      getTips: action,
      addTip: action,
      currentDealer: observable,
      clearCurrentDealer: action,
      getTodayTips: action,
      setCurrentDealer: action.bound,
    });
    this.getTips();
  }

  getAllTipAmounts() {
    return LogicHelper.GetAllAmounts(this.tips);
  }

  getAllTipDates() {
    return LogicHelper.GetAllDates(this.tips);
  }

  setCurrentDealer(player: IUser) {
    this.currentDealer = player;
  }

  clearCurrentDealer() {
    this.currentDealer = null;
  }

  getTodayTips() {
    const today = moment();
    return this.tips.filter((tip) =>
      moment(tip.created_at).isSame(today, 'day'),
    );
  }

  async getTips() {
    const data = await this.get();
    this.tips = data;
  }

  async addTip(amount: number) {
    await this.post('', {
      amount,
      user: this.currentDealer,
    });
    this.getTips();
  }

  getTipsByPlayer(playerId: number) {
    return this.tips.filter((tip) => Number(tip.user.id) === playerId);
  }

  getPlayerTipsByDate(playerName: string) {
    const player = userStore.findUserByName(playerName);
    const playerTips = this.getTipsByPlayer(player.id);
    const dates = LogicHelper.GetAllDates(playerTips);
    const amounts = LogicHelper.GetAllAmounts(playerTips);
    return { dates, amounts };
  }
}

const tipStore = new TipStore();
export default tipStore;
