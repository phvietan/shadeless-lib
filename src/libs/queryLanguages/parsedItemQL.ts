import {FuzzStatus, MongoItem} from '../repositories/status';
import {QueryLanguage} from './queryLanguage';

export class ParsedItemQL<T extends MongoItem> extends QueryLanguage<T> {
  protected all: boolean = false;

  public setAll(a: boolean) {
    this.all = a;
    return this;
  }

  public async setQueryDone(item: T): Promise<void> {
    await this.checkDoneInitDatabase();
    await this.db.update({_id: item._id}, {
      status: FuzzStatus.DONE,
    });
  }

  public async setQueryTodo(item: T): Promise<void> {
    await this.checkDoneInitDatabase();
    await this.db.update({_id: item._id}, {
      status: FuzzStatus.TODO,
    });
  }
}
