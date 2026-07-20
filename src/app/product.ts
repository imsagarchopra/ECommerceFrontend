import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a strict TypeScript interface mapping directly to your C# Product Entity
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

@Injectable({
  providedIn: 'root' // 👈 This registers the class with Angular's Dependency Injection container
})
export class ProductService {
  // Replace this port with your exact running .NET API Localhost Port
  private apiUrl = 'http://localhost:5011/api/products'; 

  // Dependency Injection: Injecting Angular's HTTP Client engine into our class constructor
  constructor(private http: HttpClient) {}

  // Returns an "Observable" stream containing our array of products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); // 👈 Executes a GET request
  }
}
