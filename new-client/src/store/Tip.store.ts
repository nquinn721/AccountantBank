import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';

export interface Tip {
  id: string;
  message: string;
  amount: number;
  date: Date;
}

export class TipStore extends BaseStore {
  url: string = 'tips';
  tips: Tip[] = [];

  constructor() {
    super();
    makeObservable(this, {
      tips: observable,
      addTip: action,
      totalAmount: computed,
    });
  }

  async addTip(tip: Tip) {
    const newTip = await this.post(this.url, tip);
    this.tips.push(newTip);
  }

  get totalAmount() {
    return this.tips.reduce((sum, tip) => sum + tip.amount, 0);
  }
}

const tipStore = new TipStore();
export default tipStore;
