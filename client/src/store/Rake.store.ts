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

  getAllRakes(rakes: Rake[] = this.rakes) {
    const dealerRakes = this.getAllRakesPerDate(rakes);
    const allRakes = Object.values(dealerRakes);
    return allRakes.map((rake) => {
      return rake.reduce((acc, amount) => acc + amount, 0);
    });
  }

  getAllDates(rakes: Rake[] = this.rakes) {
    return rakes
      .map((rake) => moment(rake.created_at).format("MM/DD/YYYY"))
      .reduce((acc, date) => {
        if (!acc.includes(date)) {
          acc.push(date);
        }
        return acc;
      }, [] as string[]);
  }

  getAllRakesPerDate(rakes: Rake[] = this.rakes) {
    return rakes.reduce((acc, rake) => {
      const date = moment(rake.created_at).format("MM/DD/YYYY");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(rake.amount);
      return acc;
    }, {} as { [key: string]: number[] });
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
