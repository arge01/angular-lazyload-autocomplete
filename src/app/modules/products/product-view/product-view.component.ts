import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Model as IProduct } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {
  query!: string;
  product$!: Observable<IProduct>;

  constructor(
    private services: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getProduct(params?.['id']);
    });

    this.route.queryParams.subscribe(params => {
      this.query = params?.['query'];
    });
  }

  getProduct(id: number) {
    this.product$ = this.services.findById(id);
  }
}
