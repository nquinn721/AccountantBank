import { makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { IUser } from './User.store';

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
    console.log('Adding transaction:', {
      userId,
      type,
      paytype,
      amount,
      cashOutPaid,
    });
    await this.post({
      user: userId,
      type,
      paytype,
      amount,
      cashOutPaid,
    });
  }
}

export const transactionStore = new TransactionStore();
