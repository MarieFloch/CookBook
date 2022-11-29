import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FaceSnapListComponent } from "./face-snap-list/face-snap-list.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NewFaceSnapComponent } from "./new-face-snap/new-face-snap.component";
import { SingleFaceSnapComponent } from "./single-face-snap/single-face-snap.component";

const routes : Routes = [
    {path : 'faceSnap', component : FaceSnapListComponent},
    {path : '', component : LandingPageComponent},
    {path : 'faceSnap/:id', component : SingleFaceSnapComponent},
    {path : 'create', component : NewFaceSnapComponent}
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AppRoutingModule{ }
