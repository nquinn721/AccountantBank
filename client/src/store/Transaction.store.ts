import { makeObservable } from 'mobx';
import { BaseStore } from './Store.base';
import { IUser } from './User.store';

export interface ITransaction {
  id: string;
  user: IUser;
  amount: number;
  cashOutPaid: number;
  type: string; // "borrow" | "paid"
  paySource: string; // "cash" | "venmo" | "zelle" | "paypal" | "cashapp" | "other"
  notes: string;
  created_at: Date;
  isSettled: boolean;
}
class TransactionStore extends BaseStore {
  url: string = '/transaction';
  transactions: ITransaction[] = [];

  constructor() {
    super();
    makeObservable(this);
    this.getTransactions();
  }

  async getTransactions() {
    const data = await this.get('');
    this.transactions = data;
  }
  async getMoneyOwed(userId: number) {
    const moneyOwed = await this.get(`moneyOwed/${userId}`);
    return moneyOwed;
  }

  async addUserTransaction({
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
    await this.post('', {
      user: userId,
      type,
      paytype,
      amount,
      cashOutPaid,
    });

    this.getTransactions();
  }
}

const transactionStore = new TransactionStore();
export default transactionStore;
