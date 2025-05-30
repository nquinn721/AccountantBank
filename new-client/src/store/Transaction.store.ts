import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { IUser, userStore } from './User.store';

export interface ITransaction {
  id: string;
  user: IUser;
  amount: number;
  cashOutPaid: number;
  paySource?: string; // "cash" | "venmo" | "zelle" | "paypal" | "cashapp" | "other"
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

  async buyIn({
    userId,
    amount,
    paySource = 'cash',
    isPaid = false,
  }: {
    userId: number;
    amount: number;
    paySource?: string;
    isPaid?: boolean;
  }) {
    await this.addTransaction({
      userId,
      type: 'borrow',
      amount,
      paySource,
    });
    if (isPaid) {
      await this.addTransaction({
        userId,
        type: 'paid',
        amount,
        paySource,
      });
    }
  }

  async cashOut({
    playerOwed,
    userId,
    amount,
    paySource = 'cash',
  }: {
    playerOwed: number;
    userId: number;
    amount: number;
    paySource?: string;
  }) {
    if (playerOwed > 0) {
      this.addTransaction({
        userId,
        type: 'paid',
        amount: playerOwed < amount ? playerOwed : amount,
        paySource,
      });
    }

    this.addTransaction({
      userId,
      type: 'cashout',
      amount,
      cashOutPaid: amount > playerOwed ? amount - playerOwed : 0, // Cash out minus what they owe
      paySource,
    });
  }

  async addTransaction({
    userId,
    type,
    paySource = 'cash',
    amount,
    cashOutPaid = 0,
  }: {
    userId: number;
    type: string;
    paySource?: string;
    amount: number;
    cashOutPaid?: number;
  }) {
    if (!userId) return;
    await this.post({
      user: userId,
      type,
      paySource,
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
