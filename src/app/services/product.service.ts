import { Inject, Injectable } from '@angular/core';

import { Services, params } from '.';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Criteria, Model, Response } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService
  implements Services<Model, Response<Model>, Criteria>
{
  private uri: string;

  constructor(
    @Inject('api') private api: string,
    private http: HttpClient
  ) {
    this.uri = `${this.api}/${params.product}`;
  }

  findAll(): Observable<Response<Model>> {
    return this.http.get<Response<Model>>(this.uri);
  }

  findById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.uri}/${id}`);
  }

  findAllSearch(
    query: string,
    criteria?: Criteria
  ): Observable<Response<Model>> {
    return this.http.get<Response<Model>>(
      `${this.uri}/search?q=${query}&limit=${criteria?.limit || params.limit}&skip=${criteria?.skip || params.skip}`
    );
  }

  findAllCriteria(criteria: Criteria): Observable<Response<Model>> {
    return this.http.get<Response<Model>>(
      `${this.uri}?limit=${criteria.limit}&skip=${criteria.skip}`
    );
  }

  save(form: Model): Observable<Model> {
    throw new Error('Method not implemented.');
  }

  update(form: Model): Observable<Model> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): boolean {
    throw new Error('Method not implemented.');
  }
}
