import { makeObservable } from "mobx";
import { BaseStore } from "./Store.base";

class AppStore extends BaseStore {
  constructor() {
    super();
    makeObservable(this, {});
  }
}

export const appStore = new AppStore();
