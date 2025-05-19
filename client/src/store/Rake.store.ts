import { action, makeObservable, observable } from "mobx";
import { BaseStore } from "./Store.base";
import moment from "moment";

export interface Rake {
  id: number;
  amount: number;
  created_at: Date;
}
class RakeStore extends BaseStore {
  rakes: Rake[] = [];
  url: string = "/rake";

  constructor() {
    super();
    makeObservable(this, {
      rakes: observable,
      getRakes: action,
      addRake: action,
    });
    this.getRakes();
  }

  getTodayRakes() {
    const today = moment();
    return this.rakes.filter((rake) =>
      moment(rake.created_at).isSame(today, "day")
    );
  }

  async getRakes() {
    const data = await this.get(this.url);
    this.rakes = data;
  }

  async addRake(amount: number) {
    await this.post(this.url, { amount });
    this.getRakes();
  }
}
export const rakeStore = new RakeStore();
