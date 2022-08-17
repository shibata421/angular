import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(
        map(o => o),
        catchError(e => this.errorHandler(e))
      )
  }
 
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
    .pipe(
      map(o => o),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
    .pipe(
      map(o => o),
      catchError(e => this.errorHandler(e))
    )
  } 

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
    .pipe(
      map(o => o),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`)
    .pipe(
      map(o => o),
      catchError(e => this.errorHandler(e))
    )
  }
  
  private errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}

