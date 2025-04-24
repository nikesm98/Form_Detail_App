import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  item: Item = {
    id: 0,
    name: '',
    phone: '',
    email: ''
  };

  isEdit = false;

  constructor(
    private svc: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      const existing = this.svc.getById(id);
      if (existing) {
        this.item = {
          ...existing
        };
        this.isEdit = true;
      }
    }
  }

  formValid(): boolean {

    return !!this.item.name && !!this.item.phone && !!this.item.email;
  }


  save() {
    if (this.isEdit) {
      this.svc.update(this.item);
    } else {
      this.svc.create(this.item);
    }
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}


