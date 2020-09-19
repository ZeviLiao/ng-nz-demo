import { User } from '../entity/user';
import { Store } from './store';

export interface State {
  currentUser: User | null;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<State> {
  constructor() {
    super({
      currentUser: null,
    });
  }

  get currentUser$() {
    return this.select(state => state.currentUser);
  }
  get currentUser() {
    return this.selectSync(state => state.currentUser);
  }

  setCurrentUser(user: User) {
    this.dispatch(state => ({
      ...state,
      currentUser: user,
    }));
  }
}
