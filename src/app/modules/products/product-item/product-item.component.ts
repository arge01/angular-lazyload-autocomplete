import { Component, Input } from '@angular/core';

import { Model as IProduct } from 'src/app/models/product';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() query!: string;
  @Input() product!: IProduct;
}
