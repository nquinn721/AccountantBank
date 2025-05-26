import { action, makeObservable, observable } from 'mobx';
import moment from 'moment';
import { LogicHelper } from './LogicHelper';
import { BaseStore } from './Store.base';

export interface IRake {
  id: number;
  amount: number;
  created_at: Date;
}
class RakeStore extends BaseStore {
  rakes: IRake[] = [];
  url: string = '/rake';

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
      moment(rake.created_at).isSame(today, 'day'),
    );
  }

  getAllRakeAmounts() {
    return LogicHelper.GetAllAmounts(this.rakes);
  }

  getAllRakeDates() {
    return LogicHelper.GetAllDates(this.rakes);
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
const rakeStore = new RakeStore();
export default rakeStore;
