import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';
import { AddNewEmployeeRequest } from '../models/add-new-employee.request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }


  public getEmployeeList() {
    const url = "https://tworks-exercise-api.herokuapp.com/employee/list";
    return this.httpClient.get<Employee[]>(url);
  }

  public addNewEmployee(request: AddNewEmployeeRequest) {
    const url = "https://tworks-exercise-api.herokuapp.com/employee/add";
    return this.httpClient.post<any>(url, request);
  }

  public removeEmployee(id: number) {
    const url = "https://tworks-exercise-api.herokuapp.com/employee/delete/";
    return this.httpClient.delete(url + id);
  }
}
