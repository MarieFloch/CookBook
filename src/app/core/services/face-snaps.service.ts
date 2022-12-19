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

  /**********************************************************************************************************************
   * Fonctions permettant de filtrer les recettes
  **********************************************************************************************************************/

  // Temps.
  getRecetteByTime(time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.temps == time)),
    );
  }

  // Difficulté + description (type) + ordre décroissant de like.
  getRecetteByDifficulteDescriptionOrderByLike(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Difficulté + description + temps + ordre décroissant de like.
  getRecetteByDifficulteDescriptionOrderByLikeTime(difficulte: string, description: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .filter(recette => recette.temps == time)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Difficulté + ordre décroissant de like.
  getRecetteByDifficulteOrderByLike(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Difficulté + temps + ordre décroissant de like.
  getRecetteByDifficulteOrderByLikeTime(difficulte: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.temps == time)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Difficulté.
  getRecetteByDifficulte(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)),
    );
  }

  // Difficulté + ordre alphabétique de titre.
  getRecetteByDifficulteOrder(difficulte: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Difficulté + temps + ordre alphabétique de titre.
  getRecetteByDifficulteOrderTime(difficulte: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.temps == time)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Difficulté + temps.
  getRecetteByDifficulteTime(difficulte: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.temps == time)),
    );
  }

  // Difficulté + description.
  getRecetteByDifficulteDescription(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)),
    );
  }

  // Difficulté + description + ordre alphabétique de titre.
  getRecetteByDifficulteDescriptionOrder(difficulte: string, description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Difficulté + description + temps + ordre alphabétique de titre.
  getRecetteByDifficulteDescriptionOrderTime(difficulte: string, description: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.difficulte == difficulte)
        .filter(recette => recette.description == description)
        .filter(recette => recette.temps == time)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }


  // Description.
  getRecetteByDescription(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)),
    );
  }

  // Description + temps.
  getRecetteByDescriptionTime(description: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
      .filter(recette => recette.temps == time)),
    );
  }

  // Description + ordre décroissant de like.
  getRecetteByDescriptionOrderByLike(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Description + temps + ordonnée + ordre décroissant de like.
  getRecetteByDescriptionOrderByLikeTime(description: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
        .filter(recette => recette.temps == time)
        .sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Description + ordre alphabétique de description.
  getRecetteByDescriptionOrder(description: string): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Description + temps + ordre alphabétique de description.
  getRecetteByDescriptionOrderTime(description: string, time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].filter(recette => recette.description == description)
        .filter(recette => recette.temps == time)
        .sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Ordre alphabétique de titre.
  getRecetteByOrder(): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.titre > b.titre ? 1 : -1)),
    );
  }

  // Temps + ordre alphabétique de titre.
  getRecetteByOrderTime(time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => a.titre > b.titre ? 1 : -1)
        .filter(recette => recette.temps == time)),
    );
  }

  // Ordre décroissant de like.
  getRecetteOrderByLike(): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => b.snaps - a.snaps)),
    );
  }

  // Temps + ordre décroissant de like.
  getRecetteOrderByLikeTime(time: number): Observable<FaceSnap[]> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a, b) => b.snaps - a.snaps)
        .filter(recette => recette.temps == time)),
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