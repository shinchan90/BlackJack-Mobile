import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComoJogarPageRoutingModule } from './como-jogar-routing.module';

import { ComoJogarPage } from './como-jogar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComoJogarPageRoutingModule
  ],
  declarations: [ComoJogarPage]
})
export class ComoJogarPageModule {}
