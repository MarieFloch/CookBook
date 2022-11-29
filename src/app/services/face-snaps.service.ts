import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.models';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  listeSnaps : FaceSnap[] = [
    {
      id : 1,
      titre: 'Riz mexicain',
      description: "Plat végétarien" ,
      recette : "1) Couper l’oignon et le poivron finement. \n 2) Faire revenir l'oignon et le poivron dans une poêle huilée pendant 5 min. \n 3) Ajouter les épices et le concentré de tomate. \n 4) Laisser mijoter quelques minutes. \n 5) Ajouter le riz, bien mélanger et laisser frire quelques minutes. \n 6) Ajouter le bouillon de légumes dilué dans 50 cl d'eau bouillante. \n 7) Couvrir et laisser cuire 10 min en remuant pour éviter que le fond brule. \n 8) Ajouter les haricots rouges et les tomates séchées coupées en morceaux. \n 9) Lorsque toute l'eau s'est évaporée, gouter le riz. S'il n'est pas cuit, rajouter un peu d'eau jusqu'à bonne cuisson.",
      date: new Date(),
      snaps: 0,
      imageUrl: 'assets/riz.jpg',
    },
    {
      id : 2,
      titre: 'Coquillettes au four',
      description: 'Plat végétarien',
      recette : "1) Mettre les coquillettes dans un plat à gratin. \n 2) Placer la féta au centre du plat. \n 3) Couper la courgettes en dés de taille moyenne et ajouter-les dans le plat. \n 4) Couper les tomates séchées et ajouter-les dans le plat. \n 5) Couper la mozzarella en cube et ajouter-les dans le plat. \n 6) Diluer le bouillon de légumes dans de l'eau bouillante et verser la préparation dans le plat. \n 7) Ajouter 3 à 4 cuillères de crème fraiche. \n 8) Saler, poivrer, ajouter les herbes de provence et quelques gousses d'ail. \n 9) Enfourner à 180 °C pendant 10 à 15 min.",
      imageUrl: 'assets/coquillettes.jpg',
      date: new Date(),
      snaps: 20,
    },
    {
      id :3,
      titre: 'Pâtes pesto poulet',
      description: 'Plat végétarien',
      recette : "1) Découper les filets de poulet en petits morceaux. \n 2) Faire mariner le poulet dans deux à trois cuillères de pesto. \n 3) Pendant ce temps, couper l'oignon en petits morceaux. \n 4) Dorer l'oignon dans une poêle huilée pendant 3 min. \n 5) Cuire les spaghettis. \n 6) Une fois l’oignon doré, ajouter le poulet, les tomates marinées et la crème liquide. \n 7) Laisser mijoter à feu doux pendant 5 min. \n 8) Ajouter les spaghettis à la préparation et bien mélanger.",
      imageUrl: 'assets/pates_pesto.jpg',
      date: new Date(),
      snaps: 160
    }

  ]

  getAllFaceSnaps() : FaceSnap[] {
   return this.listeSnaps;
  }

  faceSnapById(identifiant : number, snapType : 'snap' | 'unsnap') : void {
    const faceSnap = this.listeSnaps.find(snaps => snaps.id === identifiant);
    if ( faceSnap ) {
      if ( snapType == 'snap') {
        faceSnap.snaps ++;
      } else if ( snapType == 'unsnap' ) {
        faceSnap.snaps --;
      }
    } else {
      throw new Error('FaceSnap not found!');
    }
  }

  getFaceSnapById(identifiant : number) : FaceSnap {
    const faceSnap = this.listeSnaps.find(snaps => snaps.id === identifiant);
    if ( !faceSnap ) {
      throw new Error('FaceSnap not found!');
    } else {
      return faceSnap;

    }
  }
}