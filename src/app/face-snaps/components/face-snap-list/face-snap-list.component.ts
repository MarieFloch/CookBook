import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {

  selected = "Tout";
  selected_difficultes = "Tout";
  selected_tri = "Aucun";


  faceSnaps$ !: Observable<FaceSnap[]>;


  constructor(private faceSnapsService : FaceSnapsService) { }

  ngOnInit(): void {
    this.choose(this.selected, this.selected_difficultes, this.selected_tri);

  }

  choose(type : string, difficulte : string, tri : string) {

    if (type == "Tout" && difficulte == "Tout" ) {
      if (tri == "Aucun") {
        console.log(1);
        this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
      }
      else if (tri == "Tri par titre"){
        console.log(2);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByOrder();
      }
      else if (tri == "Tri par like"){
        console.log(3);
        this.faceSnaps$ = this.faceSnapsService.getRecetteOrderByLike();
      }
    }

    else if(type != "Tout" && difficulte != "Tout" ) {
      if (tri == "Aucun") {
        console.log(4);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescription(difficulte,type);
      }
      else if(tri == "Tri par titre") {
        console.log(5);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrder(difficulte,type);
      }
      else if(tri == "Tri par like") {
        console.log(6);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrderByLike(difficulte,type);
      }
    }

    else if( type == "Tout" && difficulte != "Tout" ){
      if (tri == "Aucun") {
        console.log(6);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulte(difficulte);
      }
      else if(tri == "Tri par titre") {
        console.log(7);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrder(difficulte);
      }
      else if(tri == "Tri par like") {
        console.log(8);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrderByLike(difficulte);
      }
    }

    else if( type != "Tout" && difficulte == "Tout" ){
      if (tri == "Aucun") {
        console.log(9);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDescription(type);
      }
      else if(tri == "Tri par titre") {
        console.log(10);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrder(type);
      }
      else if(tri == "Tri par like") {
        console.log(11);
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrderByLike(type);
      }
    }





    /*if (tri == "Tri par titre") {
      this.faceSnaps$= this.faceSnapsService.getRecetteByOrder();
    }*/

  }



}
