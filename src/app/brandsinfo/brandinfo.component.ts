import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-brandinfo',
  imports: [MatSnackBarModule, MatTableModule, NgIf],
  templateUrl: './brandinfo.component.html',
  styleUrl: './brandinfo.component.css'
})
export class BrandinfoComponent {
  brandDetails: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const brand_id = this.route.snapshot.paramMap.get('brand_id');
    if (brand_id) {
      this.fetchBrandDetails(brand_id);
    }
  }

  fetchBrandDetails(brand_id: string): void {
    this.productService.getAllProducts().subscribe((products) => {
      const brand = products.find((product) => product.brand_id === brand_id);
      if (brand) {
        this.brandDetails = brand;
      }
    });
  }
}
