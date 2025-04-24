import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  items  : Item[] = [];
  constructor(private svc : ItemService){}

  ngOnIt(){
    this.svc.getAll().subscribe(data => this.items = data);

  }
  delete(id : number) {
    this.svc.delete(id);
  }
}
