import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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

  response!: Observable<IResponse<IProduct>>;
  isSuccess!: boolean;

  page!: number;
  total!: number;
  products: Array<IProduct> = [];

  items: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private services: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params?.['query']) {
        this.query = params?.['query'];
        this.getSearch(1, params?.['query']);
      } else {
        this.getAllCriteria(1, { limit: 10, skip: 0 });
      }
    });
  }

  getPage(item: number, query: string) {
    const criteria: Criteria = {
      limit: 10,
      skip: (item - 1) * 10,
    };

    this.query
      ? this.getSearch(item, query, criteria)
      : this.getAllCriteria(item, criteria);
  }

  getAllCriteria(page: number, criteria: Criteria) {
    this.isSuccess = false;

    this.page = 0;
    this.items = [];

    this.services
      .findAllCriteria(criteria)
      .subscribe((res: IResponse<IProduct>) => {
        this.isSuccess = true;

        this.page = page;
        this.total = res.total;

        this.products = res.products;

        for (let i = 0; i < Math.ceil(res.total / constants.limit); i++) {
          this.items[i] = i + 1;
        }
      });
  }

  getSearch(page: number, query: string, criteria?: Criteria) {
    this.isSuccess = false;

    this.page = 0;
    this.items = [];

    this.services
      .findAllSearch(query, criteria)
      .subscribe((res: IResponse<IProduct>) => {
        this.isSuccess = true;

        this.page = page;
        this.total = res.total;

        this.products = res.products;

        for (let i = 0; i < Math.ceil(res.total / constants.limit); i++) {
          this.items[i] = i + 1;
        }
      });
  }
}
