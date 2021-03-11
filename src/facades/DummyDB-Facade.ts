import { IFriend } from '../interfaces/IFriend';

function singleValuePromise<T>(val: T | null): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}

function arrayValuePromise<T>(val: Array<T>): Promise<Array<T>> {
  return new Promise<Array<T>>((resolve, reject) => {
    setTimeout(() => resolve(val), 0);
  })
}

export default class FriendsFacade {
  friends: Array<IFriend> = [
    { id: "id1", firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: "secret" },
    { id: "id2", firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: "secret" },
  ]

  async addFriend(friend: IFriend): Promise<IFriend> {
    this.friends.push(friend);
    const promise = await singleValuePromise<IFriend>(friend) as IFriend;
    return promise;
  }

  async deleteFriend(friendEmail: string): Promise<IFriend> {
    for (let index = 0; index < this.friends.length; index++) {
      if (this.friends[index].email === friendEmail){
        this.friends.splice(index);
        return await singleValuePromise<IFriend>(this.friends[index]) as IFriend;
      } 
    }
    throw new Error("Kan ikke finde person")
  }

  async getAllFriends(): Promise<Array<IFriend>> {
    const f: Array<IFriend> = this.friends;
    return arrayValuePromise<IFriend>(this.friends);
  }

  async getFriend(friendEmail: string): Promise<IFriend | null> {
    let friend: IFriend | null
    friend = this.friends.find(f => f.email === friendEmail) || null;
    return singleValuePromise<IFriend>(friend);
  }
}
