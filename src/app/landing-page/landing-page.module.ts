import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule
  ],
  exports:[
    LandingPageComponent,
    MatGridListModule
  ]
})
export class LandingPageModule { }
