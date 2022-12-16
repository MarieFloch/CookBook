import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.models';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
              private faceSnapsService : FaceSnapsService,
              private router : Router) { }

  snapForm !: FormGroup;
  faceSnapPreview$ !: Observable<FaceSnap>;
  //urlRegex !: RegExp;


  ngOnInit(): void {
    /*this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;*/

    this.snapForm = this.formBuilder.group({
      titre: [null, Validators.required],
      description: [null, Validators.required],
      ingredients: [null, Validators.required],
      recette: [null, Validators.required],
      imageUrl: [null]/*[null, Validators.pattern(this.urlRegex)]*/,
      localisationImg: [null]
    });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
          date: new Date(),
          snaps: 0,
          id: 0
      }))
    )
  }

  onSubmitForm() {
    this.faceSnapsService.getNewFaceSnap(this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('faceSnap'))
    ).subscribe();
  }

}
