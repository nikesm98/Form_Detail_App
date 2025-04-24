
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: Item[] = [];

  constructor(private svc: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }


  private loadItems(): void {
    this.svc.getAll()
      .subscribe(data => this.items = data,
        err => console.error('Failed to load items', err));

  }

  delete(id: number): void {
    if (!confirm('Really delete this item?')) {
      return;
    }
  
    this.svc.delete(id);   
    this.loadItems(); 
  }

  
}
