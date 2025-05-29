import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { IUser } from './User.store';

export interface Tip {
  id: string;
  message: string;
  amount: number;
  date: Date;
  user: IUser;
}

export class TipStore extends BaseStore {
  url: string = '/tip';
  tips: Tip[] = [];

  constructor() {
    super();
    makeObservable(this, {
      tips: observable,
      addTip: action,
      totalAmount: computed,
      getCurrentTips: action,
    });
    this.getCurrentTips();
  }

  async getCurrentTips() {
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000,
    ).toISOString();
    const data = await this.get(`?created_at[gte]=${twentyFourHoursAgo}`);
    this.tips = data;
  }

  async addTip({ tip, user }: { tip: number; user: IUser | null }) {
    console.log('Adding tip:', tip, 'for user:', user);
    const newTip = await this.post({ user, amount: tip });
    this.tips.push(newTip);
  }

  get totalAmount() {
    return this.tips.reduce((sum, tip) => sum + tip.amount, 0);
  }
}

const tipStore = new TipStore();
export { tipStore };
