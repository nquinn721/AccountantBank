import { action, computed, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';

export interface IRake {
  id: string;
  amount: number;
  date: Date;
}

// RakeStore extends BaseStore
class RakeStore extends BaseStore {
  rakes: IRake[] = [];

  constructor() {
    super();
    makeObservable(this, {
      rakes: observable,
      addRake: action,
      getRakes: action,
      totalAmount: computed,
    });
    this.getRakes();
  }

  async getRakes() {
    const data = await this.get();
    this.rakes = data;
  }

  async addRake(amount: number) {
    const newRake = await this.post({ amount });
    this.rakes.push(newRake);
  }
  get totalAmount() {
    return this.rakes.reduce((sum, rake) => sum + rake.amount, 0);
  }
}

export const rakeStore = new RakeStore();
