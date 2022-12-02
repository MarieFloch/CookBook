import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.models';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap !: FaceSnap;
  singleFaceSnap$ !: Observable<FaceSnap>;


  constructor(private faceSnapsService: FaceSnapsService,
    private route : ActivatedRoute,
    private router : Router) {}


  buttonMessage : string = "Like";


  ngOnInit(){
    const snapId = +this.route.snapshot.params['id'];
    this.singleFaceSnap$ = this.faceSnapsService.getFaceSnapById(snapId) ;
  }

  onAddSnap(facesnapId : number) {
    if (this.buttonMessage === "Like") {
      this.faceSnapsService.faceSnapById(facesnapId, 'snap').pipe(
        tap(()=> {
          this.singleFaceSnap$ = this.faceSnapsService.getFaceSnapById(facesnapId);
          this.buttonMessage = "Oups, déjà liké !";
        })
      ).subscribe();

    }

    else if (this.buttonMessage === "Oups, déjà liké !") {
      this.faceSnapsService.faceSnapById(facesnapId,'unsnap').pipe(
        tap(()=>{
          this.singleFaceSnap$ = this.faceSnapsService.getFaceSnapById(facesnapId);
          this.buttonMessage ="Like" ;
        })
      ).subscribe();

    }
  }

  retour() {
    this.router.navigateByUrl("/faceSnap")
  }


}
