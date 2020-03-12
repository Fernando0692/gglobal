import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from './_services/request.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Empleado } from './_models/empleado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'g-global-app';

  displayedColumns = ['no', 'name', 'lastName', 'email', 'avatar', 'options'];
  dataSource: MatTableDataSource<Empleado>;
  expandedElement: Empleado | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public API: RequestService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

  getAll() {
    this.API.getData('users').subscribe(
      response => {
        if (response.data.length > 0) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
        }
      }
    );
  }

  Add() {
    console.log('Add');
  }

  Edit(event, item) {
    console.log(event, item);
  }

  Delete(event, id) {
      event.stopPropagation();
      this.API.getData('users/' + id).subscribe(
        response => {
          console.log(response);
          this.getAll();
        }
      );
    }
  }
