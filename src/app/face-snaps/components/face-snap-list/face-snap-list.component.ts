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
  selected_temps = "Tout";
  time !: number;


  faceSnaps$ !: Observable<FaceSnap[]>;


  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.choose(this.selected, this.selected_difficultes, this.selected_tri, this.selected_temps);

  }

  // Fonction de filtrage.
  choose(type: string, difficulte: string, tri: string, temps: string) {

    this.time = parseInt(temps);
    console.log("time:",this.time);

    if (type == "Tout" && difficulte == "Tout") {
      if (tri == "Aucun") {
        if (temps == "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByOrderTime(this.time);
        }
      }

      else if (tri == "Tri par titre") {
        if (temps != "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByOrderTime(this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByOrder();
        }
      }

      else if (tri == "Tri par like") {
        if (temps != "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteOrderByLikeTime(this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteOrderByLike();
        }
      }
    }

    else if (type != "Tout" && difficulte != "Tout") {
      if (tri == "Aucun" && temps == "Tout" ) {
        this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescription(difficulte, type);
      }

      else if (tri == "Tri par titre") {
        if (temps != "Tout") {
              this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrderTime(difficulte, type,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrder(difficulte, type);
        }
      }

      else if (tri == "Tri par like") {
        if (temps != "Tout") {
              this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrderByLikeTime(difficulte, type,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteDescriptionOrderByLike(difficulte, type);
        }
      }
    }

    else if (type == "Tout" && difficulte != "Tout") {
      if (tri == "Aucun") {
        if (temps == "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulte(difficulte);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteTime(difficulte,this.time);
        }

      }

      else if (tri == "Tri par titre") {
        if (temps != "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrderTime(difficulte,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrder(difficulte);
        }
      }

      else if (tri == "Tri par like") {
        if (temps != "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrderByLikeTime(difficulte,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDifficulteOrderByLike(difficulte);
        }
      }
    }

    else if (type != "Tout" && difficulte == "Tout") {
      if (tri == "Aucun") {
        if(temps == "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDescription(type);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionTime(type,this.time);
        }
      }

      else if (tri == "Tri par titre") {
        if (temps != "Tout") {
              this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrderTime(type,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrder(type);
        }
      }

      else if (tri == "Tri par like") {
        if (temps != "Tout") {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrderByLikeTime(type,this.time);
        }
        else {
          this.faceSnaps$ = this.faceSnapsService.getRecetteByDescriptionOrderByLike(type);
        }
      }
    }
  }
}
