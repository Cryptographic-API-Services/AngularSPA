import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactiveUserComponent } from './inactive-user/inactive-user.component';

const routes: Routes = [
  { path: "", component: InactiveUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InactiveUserRoutingModule { }
