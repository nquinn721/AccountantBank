import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { ITransaction } from './Transaction.store';

export interface IUser {
  id: number;
  name: string;
  isPlayer?: boolean;
  isEmployee?: boolean;
  isAdmin?: boolean;
  transactions?: ITransaction[];
  moneyOwed?: number;
  totalBuyIn?: number;
  isCashedOut?: boolean;
}

class UserStore extends BaseStore {
  url: string = '/user';
  users: IUser[] = [];
  currentPlayers: IUser[] = [];

  constructor() {
    super();
    makeObservable(this, {
      users: observable,
      currentPlayers: observable,
      getUsers: action,
      getCurrentPlayers: action,
      getMoneyOwed: action,
      addUser: action,
    });
    this.getUsers();
    this.getCurrentPlayers();
  }

  async getUsers() {
    this.users = await this.get();
  }

  async getCurrentPlayers() {
    const players = await this.get('current-players');
    if (players) {
      this.currentPlayers = players.map((user: IUser) => {
        return {
          ...user,
          isCashedOut: user.transactions?.some(
            (transaction) => transaction.type === 'cashout',
          ),
        };
      });
    }
  }

  getMoneyOwed(userId: number): Promise<number> {
    return this.get(`moneyOwed/${userId}`);
  }

  async addUser(name: string): Promise<IUser> {
    const newUser = await this.post({ name });
    this.users.push(newUser);
    return newUser;
  }
}

export const userStore = new UserStore();
