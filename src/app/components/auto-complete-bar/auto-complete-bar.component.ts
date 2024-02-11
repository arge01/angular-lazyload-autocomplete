import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'auto-complete-bar',
  templateUrl: './auto-complete-bar.component.html',
  styleUrls: ['./auto-complete-bar.component.scss'],
})
export class AutoCompleteBarComponent {
  items: Array<string> = [];
  filter: Array<string> | undefined;

  userForm: FormGroup;

  search!: string;
  isDisabled: boolean = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private services: ProductService
  ) {
    this.userForm = this.builder.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params?.['query']) {
        this.isDisabled = true;
      } else {
        this.isDisabled = true;
      }
      this.search = params?.['query'] || undefined;
    });

    this.getAllProduct();
  }

  async bindSearch(value: string) {
    this.filter = await this.items.filter(
      f => f?.toUpperCase().indexOf(value?.toUpperCase()) > -1
    );
    if (this.filter?.length) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  emptySearch() {
    this.isDisabled = true;
  }

  async onInput(event: Event) {
    if (!(event?.target as HTMLInputElement)?.value) {
      await this.router.navigate(['']);
      this.isDisabled = false;
    }
    this.onComplete(event);
  }

  onComplete(event: Event) {
    if ((event?.target as HTMLInputElement)?.value?.length >= 3) {
      this.bindSearch((event?.target as HTMLInputElement)?.value);
    } else {
      this.emptySearch();
    }
  }

  onSubmit() {
    const val = this.userForm.value;

    !this.isDisabled && this.onHandle(val?.search);
  }

  onHandle(search: string | undefined) {
    if (search) {
      if (this.filter?.length) {
        this.search = search;
        this.router.navigate(['/products'], { queryParams: { query: search } });
      }
    }
  }

  getAllProduct() {
    this.items = [];

    this.services.findAll().subscribe(res => {
      this.items = [...res.products.map(v => v.title)];
    });
  }
}
