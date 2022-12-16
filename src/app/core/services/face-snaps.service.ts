import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter, map, Observable, switchMap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.models';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) { }

  // Recette(s) obtenue(s) par rapport à la difficulté, au type et rangé par ordre croissant de like.
  getRecetteByDifficulteDescriptionOrderByLike(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la difficulté et rangé par ordre croissant de like.
  getRecetteByDifficulteOrderByLike(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }


  // Recette(s) obtenue(s) par rapport à la description.
  getRecetteByDescription(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la description ordonnée par nb de like.
  getRecetteByDescriptionOrderByLike(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la description par ordre alphabétique de description.
  getRecetteByDescriptionOrder(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
      .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la difficulté.
  getRecetteByDifficulte(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la difficulté et rangé par ordre alphabétique de titre.
  getRecetteByDifficulteOrder(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la difficulté et au type.
  getRecetteByDifficulteDescription(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)),
    );
  }

  // Recette(s) obtenue(s) par rapport à la difficulté, au type et rangé par ordre alphabétique de titre.
  getRecetteByDifficulteDescriptionOrder(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Recettes rangées par ordre alphabétique de titre.
  getRecetteByOrder(): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Recettes rangées par ordre décroissant de like.
  getRecetteOrderByLike(): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Toutes les recettes.
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3004/facesnaps');
  }

  faceSnapById(identifiant: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(identifiant).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3004/facesnaps/${identifiant}`, updatedFaceSnap))
    );
  }

  // Recettes par Id.
  getFaceSnapById(identifiant: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3004/facesnaps/${identifiant}`);
  }

  // Ecrire une nouvelle recette.
  getNewFaceSnap(formValue: { titre: string, description: string, recette: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.id - b.id)),
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