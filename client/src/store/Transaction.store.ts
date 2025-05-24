import { makeObservable } from 'mobx';
import { BaseStore } from './Store.base';
import userStore from './User.store';

export interface ITransaction {
  id: string;
  amount: number;
  payOut: number;
  type: string; // "buyin" | "cashout"
  created_at: Date;
  isSettled: boolean;
}
export class TransactionStore extends BaseStore {
  transactions: ITransaction[] = [];

  constructor() {
    super();
    makeObservable(this);
  }

  async cashOutPlayer({
    userName,
    type,
    isSettled = false,
    amount,
    payOut = 0,
    paytype = 'cash',
  }: {
    userName: string;
    type: string;
    isSettled?: boolean;
    amount: number;
    payOut?: number;
    paytype?: string;
  }) {
    const user = await userStore.getUser(userName);
    user.transactions.forEach(async (transaction) => {
      if (transaction.type === 'buyin' && !transaction.isSettled) {
        await this.patch(`/transaction/${transaction.id}`, {
          isSettled: true,
        });
      }
    });
    this.addUserTransaction({
      userName,
      type,
      paytype,
      isSettled,
      amount,
      payOut,
    });
  }

  async addUserTransaction({
    userName,
    type,
    paytype = 'cash',
    isSettled = false,
    amount,
    payOut = 0,
  }: {
    userName: string;
    type: string;
    paytype?: string;
    isSettled?: boolean;
    amount: number;
    payOut?: number;
  }) {
    const user = await userStore.getUser(userName);
    await this.post('/transaction', {
      user,
      type,
      paytype,
      amount,
      isSettled,
      payOut,
    });
    userStore.getUsers();
  }
}

const transactionStore = new TransactionStore();
export default transactionStore;
