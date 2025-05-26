import { makeObservable, observable } from 'mobx';
import { BaseStore } from './Base.store';

interface IUser {
  id: string;
  name: string;
}

export class UserStore extends BaseStore {
  url: string = '/user';
  users: IUser[] = [];

  constructor() {
    super();
    makeObservable(this, {
      users: observable,
    });
  }

  async getUsers() {
    this.users = await this.get();
  }

  async getCurrentPlayers() {
    console.log('hiowefhoweij');
    return await this.get('current-players');
  }
}

export const userStore = new UserStore();
