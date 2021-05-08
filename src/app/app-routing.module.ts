import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewEmployee', pathMatch: 'full' },
  { path: 'viewEmployee', component: ViewEmployeesComponent },
  { path: 'createEmployee', component: CreateEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
