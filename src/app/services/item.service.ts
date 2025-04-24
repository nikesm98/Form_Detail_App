import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsKey = 'crudItems';
  private itemsSub: BehaviorSubject<Item[]>;

  constructor() {
    const stored = localStorage.getItem(this.itemsKey);
    this.itemsSub = new BehaviorSubject<Item[]>(stored ? JSON.parse(stored) : []);
   }


  private save(items : Item[]){
    localStorage.setItem(this.itemsKey, JSON.stringify(items));
    this.itemsSub.next(items)
  }

  getAll(): Observable<Item[]> {
    return this.itemsSub.asObservable();
  }

  getById(id : number) : Item | undefined{
    return this.itemsSub.value.find(i => i.id === id);
  }

  create(item: Item) {
    const items = [...this.itemsSub.value];
    item.id = Date.now();
    this.save([...items, item]);
  }

  update(item : Item){
    const items = this.itemsSub.value.map(i => i.id === item.id ? item : i);
    this.save(items);
  }

  delete(id : number){
    const items = this.itemsSub.value.filter(i => i.id !== id);
    this.save(items);
  }
}

