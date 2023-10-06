import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/usermodel';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["id", "FirstName", "LastName", "Email", "Mobile",
    "BmiResult", "Gender", "packeges", "Date", "action"];

  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegistredUser()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  delete(id: number) {
    this.confirm.showConfirm("Are you sure want to delete this user",
      () => {
        this.api.deleteUser(id)
          .subscribe(res => {
            this.toast.success("deleted successfully", "SUCCESS");
            this.getUsers();
          });

      },
      () => {

      })
  }
}
