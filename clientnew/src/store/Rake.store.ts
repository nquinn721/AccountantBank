import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';

export interface IRake {
  id: string;
  amount: number;
  created_at: Date;
}

// RakeStore extends BaseStore
class RakeStore extends BaseStore {
  rakes: IRake[] = [];
  currentRakes: IRake[] = [];
  url: string = '/rake';

  constructor() {
    super();
    makeObservable(this, {
      rakes: observable,
      addRake: action,
      getCurrentRakes: action,
      totalAmount: computed,
      currentRakes: observable,
    });
    this.getCurrentRakes();
  }

  async getCurrentRakes() {
    const data = await this.get(`current-rakes`);
    this.currentRakes = data || [];
  }

  async addRake(amount: number) {
    const newRake = await this.post({ amount });
    this.currentRakes.push(newRake);
  }
  get totalAmount() {
    return this.currentRakes?.reduce((sum, rake) => sum + rake.amount, 0);
  }
}

export const rakeStore = new RakeStore();
