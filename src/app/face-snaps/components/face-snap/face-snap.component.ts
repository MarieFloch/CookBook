import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit{

  constructor(private faceSnapsService: FaceSnapsService,
    private router : Router) {}

  @Input() faceSnap !: FaceSnap;
  buttonMessage : string = 'Oh, snap!';


  ngOnInit(){


  }

  viewSnap(){
    this.router.navigateByUrl(`faceSnap/${this.faceSnap.id}`);
  }



}
