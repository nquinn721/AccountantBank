import { makeObservable, observable } from 'mobx';
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
    });
    this.getRakes();
  }

  async getRakes() {
    const data = await this.get();
    this.rakes = data;
  }

  async addRake(rake: IRake) {
    const newRake = await this.post(rake);
    this.rakes.push(newRake);
  }
}

export const rakeStore = new RakeStore();
