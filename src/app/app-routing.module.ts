import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

let description = 'kids landing'
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      title: '首頁',
      description: description
    }
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
