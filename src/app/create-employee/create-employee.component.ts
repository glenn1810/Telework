import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AddNewEmployeeRequest } from '../models/add-new-employee.request.model';
import { combineLatest, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom, filter, mergeMap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: Employee = { email: '', id: null, firstName: '', lastName: '' };

  employeeRequestSubject = new Subject<AddNewEmployeeRequest>();
  employeeRequestSubject$ = this.employeeRequestSubject.asObservable();

  employees: Employee[] = [];

  constructor(private router:Router,
    private route: ActivatedRoute,
  private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeList();
    this.resetForm();

    this.employeeRequestSubject$.pipe(
      switchMap((x: AddNewEmployeeRequest) => {
        return this.employeeService.addNewEmployee(x);
      })
    )
      .subscribe(x => {
        this.reloadPage();
      });
  }


  public onSubmitNewEmployee(): void {
    let request: AddNewEmployeeRequest = {
      email: this.employeeForm.email,
      firstName: this.employeeForm.firstName,
      lastName: this.employeeForm.lastName,
      id: this.employeeForm.id
    };

    if (!this.isEmployeeIdExist(request.id)) {
      this.employeeRequestSubject.next(request);
   
    }
    else {
      alert("Employee Id you created is already exist!");
    }
  } 


  private isEmployeeIdExist(id: number | null): boolean {

    const isExist = this.employees.some(x => x.id == id);

    return isExist;
  }

  private resetForm(): void {
    this.employeeForm = { email: '', id: null, firstName: '', lastName: '' };
  }

  private getEmployeeList(): void {
    this.employeeService
      .getEmployeeList()
      .subscribe(data => {
        this.employees = data;
      });
  }

  private reloadPage(): void {
    this.router.navigate(['/viewEmployee']);
  }
}
