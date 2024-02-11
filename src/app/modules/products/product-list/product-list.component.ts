import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { params as constants } from '../../../services/index';
import {
  Criteria,
  Model as IProduct,
  Response as IResponse,
} from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  query!: string;

  response!: Observable<IResponse<IProduct>>;
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

  async getSearch(page: number, query: string, criteria?: Criteria) {
    this.page = 0;
    this.items = [];

    this.response = this.services.findAllSearch(query, criteria);

    this.response.subscribe((res: IResponse<IProduct>) => {
      this.page = page;

      this.products = res.products;

      for (let i = 0; i < Math.ceil(res.total / constants.limit); i++) {
        this.items[i] = i + 1;
      }
    });
  }
}
