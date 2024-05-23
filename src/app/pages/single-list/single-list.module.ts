import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleListPageRoutingModule } from './single-list-routing.module';

import { SingleListPage } from './single-list.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleListPageRoutingModule,
    SharedModule
  ],
  declarations: [SingleListPage]
})
export class SingleListPageModule {}
