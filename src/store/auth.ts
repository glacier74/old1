import { makeAutoObservable } from 'mobx'

export class AuthStore {
  public email: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  public setEmail(email: string | null) {
    this.email = email
  }
}
