import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product'; // 👈 Import our service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // Initialize an empty array waiting for database records
  products: Product[] = [];

  // Model object bound to our UI form inputs
  newProduct = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0
  }

  // Inject our product service container using constructor injection
  constructor(private productService: ProductService,
     private cdr: ChangeDetectorRef) {}

  // OnInit acts exactly like a Page_Load event or a component mounting handler lifecycle hook
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Subscribe activates the cold HTTP network stream channel to download data
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Fetched updated product list:', data);
        this.products = data; // Assign data straight to our class variable
        this.cdr.detectChanges(); // Manually trigger change detection to update the view after data assignment
      },
      error: (err) => {
        console.error('Failed to communicate with .NET Engine:', err);
      }
    });
  }

  // Method to handle form submission
  createProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0 || this.newProduct.stockQuantity < 0 || !this.newProduct.description) {
      alert('Please enter valid product details');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: (createdProduct) => {
        console.log('API POST Success response:', createdProduct);
        // Re-fetch the product list straight from the API
        this.loadProducts();

        // Reset the form input values
        this.newProduct = {
          name: '',
          description: '',
          price: 0,
          stockQuantity: 0
        };

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }
}