import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordToolComponent } from './password-tool/password-tool.component';

const routes: Routes = [
  {path: "", component: PasswordToolComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordsRoutingModule { }
