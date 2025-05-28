import { makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';
import { ITransaction } from './Transaction.store';

export interface IUser {
  id: string;
  name: string;
  isPlayer?: boolean;
  isEmployee?: boolean;
  isAdmin?: boolean;
  transactions?: ITransaction[];
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
    });
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.get();
  }

  async getCurrentPlayers() {
    console.log('Fetching current players');
    this.currentPlayers = await this.get('current-players');
  }

  async addUser(name: string): Promise<IUser> {
    const newUser = await this.post({ name });
    this.users.push(newUser);
    return newUser;
  }
}

export const userStore = new UserStore();
