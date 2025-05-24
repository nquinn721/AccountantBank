import { makeObservable, observable } from 'mobx';
import moment from 'moment';
import { BaseStore } from './Store.base';
import { ITransaction } from './Transaction.store';

export interface IUser {
  id: number;
  name: string;
  isPlayer: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  transactions: Array<ITransaction>;
}
class User implements IUser {
  id: number;
  name: string;
  isPlayer: boolean;
  transactions: Array<ITransaction> = [];
  isAdmin: boolean;
  isEmployee: boolean;

  constructor(
    id: number = 0,
    name: string = '',
    isPlayer: boolean = false,
    isAdmin: boolean = false,
    isEmployee: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.isPlayer = isPlayer;
    this.isAdmin = isAdmin;
    this.isEmployee = isEmployee;
    this.transactions = [];
  }
}

class UserStore extends BaseStore {
  url: string = '/user';
  users: IUser[] = [];

  constructor() {
    super();
    makeObservable(this, {
      users: observable,
    });
    this.getUsers();
  }

  async getUser(userName: string, options: any = {}) {
    if (!this.hasUser(userName)) {
      const data = await this.post(this.url, { name: userName, ...options });
      this.users.push(data);
    }
    return this.users.find((user) => user.name === userName) || new User();
  }
  async getUsers() {
    const data = await this.get(this.url);
    this.users = data;
  }
  async addUser({
    name,
    isPlayer,
    isEmployee,
  }: {
    name: string;
    isPlayer: boolean;
    isEmployee: boolean;
  }) {
    const data = await this.post(this.url, {
      name: name.trim(),
      isPlayer,
      isEmployee,
    });
    this.users.push(data);
    return data;
  }

  getPlayerByName(name: string) {
    return this.users.find((p) => p.name === name) || new User();
  }

  getPlayerBuyIns(name: string) {
    const player = this.getPlayerByName(name);
    return player
      ? player.transactions.filter(
          (t) =>
            t.type === 'buyin' && moment(t.created_at).isSame(moment(), 'day'),
        )
      : [];
  }

  hasUser(name: string) {
    return this.users.find((user) => user.name === name);
  }
  findUserById(id: number) {
    return this.users.find((user) => user.id === id) || new User();
  }
  findUserByName(name: string) {
    return this.users.find((user) => user.name === name) || new User();
  }
  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.delete(`${this.url}/${id}`);
  }
  updateUser(id: number, user: IUser) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      this.put(`${this.url}/${id}`, user);
      this.getUsers();
    }
  }
}

const userStore = new UserStore();
export default userStore;
