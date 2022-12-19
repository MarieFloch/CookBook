export class FaceSnap {
    id !: number ;
    titre !: string;
    description !: string;
    ingredients !: string;
    recette !: string;
    date !: Date;
    snaps !: number;
    difficulte ?: string;
    temps !: number;
    imageUrl !: string;
    localisationImg ?: string;


    /*constructor(titre : string, description : string, imageUrl : string,date : Date, snaps : number ) {

        this.titre = titre;
        this.description = description;
        this.date = date;
        this.snaps = snaps;
        this.imageUrl = imageUrl;
    }*/
}