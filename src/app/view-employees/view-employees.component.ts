import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { AddNewEmployeeRequest } from '../models/add-new-employee.request.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ViewEmployeesComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();

  employeeList: Employee[] = [];

  removeEmployeeSubject = new Subject<number>();
  removeEmployeeSubject$ = this.removeEmployeeSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) {
  }
  

  ngOnInit(): void {
    this.subs.add(
      this.removeEmployeeSubject$.pipe(
        switchMap((x: number) => {
          return this.employeeService.removeEmployee(x);
        })
      )
        .subscribe(x => {
          this.reloadPage();
        })
    );
  }

  employeeList$ = this.employeeService.getEmployeeList();


  removeEmployee(e: Employee): void {
    this.removeEmployeeSubject.next(Number(e.id));   
  }

  private reloadPage(): void {
    this.router.navigate(['/viewEmployee']);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
