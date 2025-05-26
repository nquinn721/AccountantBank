import { makeAutoObservable } from 'mobx';
import { BaseStore } from './Base.store';

// RakeStore extends BaseStore
class RakeStore extends BaseStore {
  rakes: any[] = [];

  constructor() {
    super();
    makeAutoObservable(this);
  }

  setRakes(rakes: any[]) {
    this.rakes = rakes;
  }

  addRake(rake: any) {
    this.rakes.push(rake);
  }

  clearRakes() {
    this.rakes = [];
  }
}

export const rakeStore = new RakeStore();
