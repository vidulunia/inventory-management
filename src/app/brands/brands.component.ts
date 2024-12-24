import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-brands',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements AfterViewInit {
  displayedColumns: string[] = ['sr_no', 'brand_name', 'brand_product']
  dataSource = new MatTableDataSource<brand_details>(brandsinfo)
  private _liveAnnouncer = inject(LiveAnnouncer);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
export interface brand_details {
  sr_no: number,
  brand_name: string,
  brand_product: any;
}
const brandsinfo: brand_details[] = [
  { sr_no: 1, brand_name: 'LG', brand_product: ['TV', 'AIR CONDITIONER',] },
  { sr_no: 2, brand_name: 'SONY', brand_product: ['TV', 'SPEAKERS'] },
  { sr_no: 3, brand_name: 'SAMSUNG', brand_product: ['TV', 'REFRIGERATOR'] },
  { sr_no: 4, brand_name: 'MI', brand_product: ['TV', 'PHONE'] },
  { sr_no: 5, brand_name: 'MILTON', brand_product: ['BOTTLE'] },
  { sr_no: 6, brand_name: 'ZEBRONICS', brand_product: ['SPEAKER'] },
  { sr_no: 7, brand_name: 'ONE PLUS', brand_product: ['PHONE', 'AIR DOPES'] },
  { sr_no: 8, brand_name: 'BOSCH', brand_product: ['TUBELIGHT', 'WASHING MACHINE'] },
  { sr_no: 9, brand_name: 'DELL', brand_product: ['LAPTOP'] },
  { sr_no: 10, brand_name: 'CONCEPT LIVING', brand_product: ['CHAIR', 'TABLE', 'WARDRBE'] }
];