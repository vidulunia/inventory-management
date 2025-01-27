import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-info',
  imports: [MatProgressSpinnerModule, CommonModule, MatTableModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  product: any = {};
  displayedColumns: string[] = ['prouct_id', 'product_name', 'brand_name', 'product_price'];
  dataSource = new MatTableDataSource<product_details>();
  loading: boolean = false;

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(): void {
    const prouct_id = this.router.url.split('/').pop();
    console.log('Product ID:', prouct_id);

    if (!prouct_id) {
      this.snackbar.open('Product not found', '', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.productService.getproductsbyid(prouct_id).subscribe(
      (response) => {
        console.log('API Response:', response);

        const selectedProduct = response.find(
          (product: any) => product.prouct_id === prouct_id
        );
        console.log("Product=>", selectedProduct);
        if (selectedProduct) {
          this.product = selectedProduct;
          this.dataSource.data = [this.product];
          console.log('Data Source:', this.dataSource.data);
        } else {
          this.snackbar.open('Product not found', '', { duration: 3000 });
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.snackbar.open('Failed to load product details', '', { duration: 3000 });
        this.loading = false;
      }
    );
  }


}

export interface product_details {
  prouct_id: number;
  product_name: string;
  brand_name: string;
  product_price: number;
}



