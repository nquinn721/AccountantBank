import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { IUser, userStore } from './User.store';

export interface ITransaction {
  id: string;
  user: IUser;
  amount: number;
  cashOutPaid: number;
  type: string; // "borrow" | "paid"
}
class TransactionStore extends BaseStore {
  url: string = '/transaction';
  transactions: ITransaction[] = [];

  constructor() {
    super();
    makeObservable(this, {
      transactions: observable,
      getTransactions: action,
      getMoneyOwed: action,
    });
    this.getTransactions();
  }

  async getTransactions() {
    const data = await this.get();
    this.transactions = data;
  }

  async getMoneyOwed(userId: number) {
    const moneyOwed = await this.get(`moneyOwed/${userId}`);
    return moneyOwed;
  }

  async addTransaction({
    userId,
    type,
    paytype = 'cash',
    amount,
    cashOutPaid = 0,
  }: {
    userId: number;
    type: string;
    paytype?: string;
    amount: number;
    cashOutPaid?: number;
  }) {
    await this.post({
      user: userId,
      type,
      paytype,
      amount,
      cashOutPaid,
    });
    userStore.getUsers();
    userStore.getCurrentPlayers();
  }

  getTotalBuyIns(transactions: ITransaction[]) {
    return transactions
      .filter((t) => t.type === 'borrow')
      .reduce((sum, t) => sum + t.amount, 0);
  }
}

export const transactionStore = new TransactionStore();
