import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, matSnackBarAnimations, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  imports: [NgIf, MatTableModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any[] = [];

  displayedColumns: string[] = ['product_name', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<product_details>();
  cart: product_details[] = [];
  constructor(private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    this.loadCart();
    this.dataSource.data = this.cart;
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.dataSource.data = this.cart;
  }

  removefromcart(product: product_details): void {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.dataSource.data = this.cart;
      this.snackbar.open(`${product.product_name} removed from cart!`, '', { duration: 3000 });

    }
  }

  clearcart(): void {
    localStorage.removeItem('cart');
    this.cartitems = [];
    this.dataSource.data = [];
  }

  updateQuantity(product: product_details, delta: number): void {
    const index = this.dataSource.data.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const currentQuantity = this.dataSource.data[index].quantity || 1;
      this.dataSource.data[index].quantity = Math.max(1, currentQuantity + delta);
    }
  }
}

export interface product_details {
  id: number;
  product_name: string;
  quantity: number;
}
