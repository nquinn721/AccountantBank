import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { IUser } from './User.store';

export interface Tip {
  id: string;
  message: string;
  amount: number;
  created_at: Date;
  user: IUser;
}

export class TipStore extends BaseStore {
  url: string = '/tip';
  tips: Tip[] = [];
  currentTips: Tip[] = [];

  constructor() {
    super();
    makeObservable(this, {
      tips: observable,
      addTip: action,
      totalAmount: computed,
      getCurrentTips: action,
      currentTips: observable,
    });
    this.getCurrentTips();
  }

  async getCurrentTips() {
    const data = await this.get(`current-tips`);
    this.currentTips = data;
  }

  async addTip({ tip, user }: { tip: number; user: IUser | null }) {
    const newTip = await this.post({ user, amount: tip });
    this.getCurrentTips();
  }

  get totalAmount() {
    return this.currentTips.reduce((sum, tip) => sum + tip.amount, 0);
  }
}

const tipStore = new TipStore();
export { tipStore };
