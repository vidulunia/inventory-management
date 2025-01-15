import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-brandinfo',
  imports: [MatSnackBarModule, MatTableModule],
  templateUrl: './brandinfo.component.html',
  styleUrl: './brandinfo.component.css'
})
export class BrandinfoComponent {

}
