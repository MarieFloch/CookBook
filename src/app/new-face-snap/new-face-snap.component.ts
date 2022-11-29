import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FaceSnap } from '../models/face-snap.models';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  snapForm !: FormGroup;
  faceSnapPreview$ !: Observable<FaceSnap>;


  ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
      titre: [null],
      description: [null],
      recette: [null],
      imageUrl: [null],
      localisationImg: [null]
    });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
          date: new Date(),
          snaps: 0,
          id: 0
      }))
    );
  }

  onSubmitForm() {
    console.log(this.snapForm.value);

  }

}
