import { Component } from '@angular/core';
import { Observable, of, share } from 'rxjs';

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
  response$!: Observable<IResponse<IProduct>>;

  constructor(
    private route: ActivatedRoute,
    private services: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params?.['query']) {
        this.query = params?.['query'];
        this.getSearch(params?.['query']);
      } else {
        this.getAllCriteria({ limit: 10, skip: 0 });
      }
    });
  }

  getPage(item: number, query: string) {
    const criteria: Criteria = {
      limit: 10,
      skip: item * 10,
    };

    this.query
      ? this.getSearch(query, criteria)
      : this.getAllCriteria(criteria);
  }

  getItems(total: number): Array<number> {
    const items = [];
    for (let i = 0; i < Math.ceil(total / constants.limit); i++) {
      items[i] = i + 1;
    }

    return items;
  }

  getAllCriteria(criteria: Criteria) {
    this.response$ = this.services.findAllCriteria(criteria);
  }

  getSearch(query: string, criteria?: Criteria) {
    this.response$ = this.services.findAllSearch(query, criteria);
  }
}
