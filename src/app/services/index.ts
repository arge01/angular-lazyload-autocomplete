import { Observable } from "rxjs";

export enum params {
  product = "products",
  limit = 10,
  skip = 0,
};

export interface Services<MODEL, RESPONSE, CRITERIA> {
  save(form: MODEL): Observable<MODEL>;
  update(form: MODEL): Observable<MODEL>;
  delete(id: number): boolean;
  findById(id: number): Observable<MODEL>;
  findAll(): Observable<RESPONSE>;
  findAllSearch(query: string, criteria?: CRITERIA): Observable<RESPONSE>;
  findAllCriteria(criteria: CRITERIA): Observable<RESPONSE>;
}