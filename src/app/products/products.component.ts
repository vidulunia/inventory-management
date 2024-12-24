import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-products',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, NgClass],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'product_name', 'product_company', 'actions']
  dataSource = new MatTableDataSource<product_details>(productsinfo)
  private _liveAnnouncer = inject(LiveAnnouncer);
  cart: any[] = [];

  constructor(private snackbar: MatSnackBar, private fb: FormBuilder) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.syncCart();

  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  syncCart(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = cart;
  }

  addtocart(product: product_details): void {
    if (!this.isInCart(product)) {
      this.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.snackbar.open(`${product.product_name} added to cart!`, '', { duration: 3000 });
    }
    else {
      this.snackbar.open(`${product.product_name} is already in the cart.`)
    }
  }

  removeFromCart(product: product_details): void {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.snackbar.open(`${product.product_name} removed from cart!`, '', { duration: 3000 });
    }
  }

  isInCart(product: product_details): boolean {
    return this.cart.some((item) => item.id === product.id);
  }
  toggleCart(element: any): void {
    if (this.isInCart(element)) {
      this.cart = this.cart.filter(
        (item) => item.product_name !== element.product_name
      );
    } else {
      this.cart.push(element);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}


export interface product_details {
  id: number;
  product_name: string;
  product_company: string;
  quantity?: number;
}

const productsinfo: product_details[] = [
  { id: 1, product_name: "TV", product_company: 'SONY' },
  { id: 2, product_name: "AIR CONDITIONER", product_company: 'LG' },
  { id: 3, product_name: "REFRIGERATOR", product_company: 'SAMSUNG' },
  { id: 4, product_name: "WARDROBE", product_company: 'CONCEPT LIVING' },
  { id: 5, product_name: "CHAIR", product_company: 'CONCEPT LIVING' },
  { id: 6, product_name: "TABLE", product_company: 'CONCEPT LIVING' },
  { id: 7, product_name: "TUBELIGHT", product_company: 'BOSCH' },
  { id: 8, product_name: "LAPTOP", product_company: 'DELL' },
  { id: 9, product_name: "BOTTLE", product_company: 'MILTON' },
  { id: 10, product_name: "SPEAKER", product_company: 'ZEBRONICS' },
  { id: 11, product_name: "PHONE", product_company: 'ONE PLUS' },
  { id: 12, product_name: "AIR DOPES", product_company: 'ONE PLUS' },
  { id: 13, product_name: "WASHING MACHINE", product_company: 'BOSCH' },
]