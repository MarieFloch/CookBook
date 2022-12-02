import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map, Observable, switchMap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.models';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {}

  getAllFaceSnaps() : Observable<FaceSnap[]> {
   return this.http.get<FaceSnap[]>('http://localhost:3004/facesnaps');
  }

  faceSnapById(identifiant : number, snapType : 'snap' | 'unsnap') : Observable<FaceSnap> {
    return this.getFaceSnapById(identifiant).pipe(
      map(faceSnap =>({
        ...faceSnap,
        snaps : faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3004/facesnaps/${identifiant}`,updatedFaceSnap))
    );
  }

  getFaceSnapById(identifiant : number) : Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3004/facesnaps/${identifiant}`);
  }

  getNewFaceSnap(formValue : {titre : string, description : string, recette : string, imageUrl : string, location ?: string}) : Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
         map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
         map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
         map(previousFacesnap => ({
            ...formValue,
            snaps: 0,
            createdDate: new Date(),
            id: previousFacesnap.id + 1
        })),
        switchMap(newFacesnap => this.http.post<FaceSnap>(
            'http://localhost:3004/facesnaps',
            newFacesnap)
        )
    );
  }

}