import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Allows us to use standard loops and conditions in HTML
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // A TypeScript array simulating our backend entity database tables
  products = [
    { id: 1, name: 'MacBook Pro M3', price: 1999.99, stock: 12 },
    { id: 2, name: 'Sony WH-1000XM5', price: 399.99, stock: 45 },
    { id: 3, name: 'Mechanical Keyboard', price: 129.50, stock: 0 }
  ];
}