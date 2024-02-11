import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { params as constants } from '../../../services/index';
import {
  Criteria,
  Model as IProduct,
  Response as IResponse,
} from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  query!: string;

  response: IResponse<IProduct> | boolean = false;
  page!: number;

  products: Array<IProduct> = [];

  items: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private services: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params?.['query'];
      this.getSearch(1, params?.['query']);
    });
  }

  getPage(item: number, query: string) {
    const criteria: Criteria = {
      limit: 10,
      skip: (item - 1) * 10,
    };

    this.getSearch(item, query, criteria);
  }

  getSearch(page: number, query: string, criteria?: Criteria) {
    this.response = false;
    this.page = 0;
    this.items = [];

    this.services
      .findAllSearch(query, criteria)
      .subscribe((res: IResponse<IProduct>) => {
        this.response = res;
        this.page = page;

        this.products = res.products;

        for (let i = 0; i < Math.ceil(res.total / constants.limit); i++) {
          this.items[i] = i + 1;
        }
      });
  }
}
