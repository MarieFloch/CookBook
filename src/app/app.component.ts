import { Component, OnInit } from '@angular/core';
import { filter, interval, map, Observable, tap } from 'rxjs';
import { FaceSnap } from './models/face-snap.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //mySnap !: FaceSnap;

  mySnap !: FaceSnap;
  myOtherSnap !: FaceSnap;
  myLastSnap !: FaceSnap;

  interval$ !: Observable<string>;

  ngOnInit(): void {


      // Si utilisation du constructeur
      /*this.mySnap = new FaceSnap( 'Archibald','Mon meilleur ami depuis tout petit !','https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg', new Date(), 0);*/

  }
}
