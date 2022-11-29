import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaceSnap } from '../models/face-snap.models';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  faceSnap !: FaceSnap;


  constructor(private faceSnapsService: FaceSnapsService,
    private route : ActivatedRoute,
    private router : Router) {}


  buttonMessage : string = "Like";


  ngOnInit(){
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
  }

  onAddSnap() {
    if (this.buttonMessage === "Like") {
      this.faceSnapsService.faceSnapById(this.faceSnap.id, 'snap');
      this.buttonMessage = "Oups, déjà liké !";
    }

    else if (this.buttonMessage === "Oups, déjà liké !") {
      this.faceSnapsService.faceSnapById(this.faceSnap.id,'unsnap');
      this.buttonMessage ="Like" ;
    }
  }

  retour() {
    this.router.navigateByUrl("/faceSnap")
  }


}
