import { AppContextType } from "@kts/ssr-utils";
import { action, makeObservable, observable } from "mobx";

export type StoreData = {
  test: number;
};

export class Store implements AppContextType {
  test = 1;

  constructor(initialData?: StoreData) {
    makeObservable(this, {
      test: observable,
      inc: action.bound,
    });

    if (initialData) {
      this.test = initialData.test;
    }
  }

  inc() {
    this.test += 1;
  }

  serialize() {
    return {
      test: this.test,
    };
  }
}
