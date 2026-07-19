import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from './product'; // 👈 Import our service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Initialize an empty array waiting for database records
  products: Product[] = [];

  // Inject our product service container using constructor injection
  constructor(private productService: ProductService) {}

  // OnInit acts exactly like a Page_Load event or a component mounting handler lifecycle hook
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Subscribe activates the cold HTTP network stream channel to download data
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Assign data straight to our class variable
      },
      error: (err) => {
        console.error('Failed to communicate with .NET Engine:', err);
      }
    });
  }
}