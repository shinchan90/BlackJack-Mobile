import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComoJogarPage } from './como-jogar.page';

const routes: Routes = [
  {
    path: '',
    component: ComoJogarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComoJogarPageRoutingModule {}
