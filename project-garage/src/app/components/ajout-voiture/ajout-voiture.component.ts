import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VoitureServiceService } from 'src/app/services/voiture-service.service';
import { Voiture } from 'src/app/models/voiture';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {
  ajoutVoitureForm: FormGroup;
  constructor(private fb: FormBuilder,private _voitureService:VoitureServiceService, private router: Router) {
    let formControls = {
      matricule: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z]-[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}-[0-9]{2,3}$'),
      ]),
      marque: new FormControl('', [
        Validators.required,
      ]),
      type: new FormControl('', [
        
      ]),
      kilometrage: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      date_arrivee: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9][0-9][0-9][0-9]+\-+[0-1][0-9]+\-+[0-3][0-9]')
      ]),
      annee_fabrication: new FormControl('', [
        Validators.pattern('[0-9]{4}'),
      ]),
      

    }

    this.ajoutVoitureForm = fb.group(formControls);
   }
  get matricule() { return this.ajoutVoitureForm.get('matricule'); }
  get marque() { return this.ajoutVoitureForm.get('marque'); }
  get type() { return this.ajoutVoitureForm.get('type'); }
  get kilometrage() { return this.ajoutVoitureForm.get('kilometrage'); }
  get date_arrivee() { return this.ajoutVoitureForm.get('date_arrivee'); }
  get annee_fabrication() { return this.ajoutVoitureForm.get('annee_fabrication'); }
  ngOnInit(): void {
  }
  ajouter (){
    
    let infos = this.ajoutVoitureForm.value;
    let voitureInstance = new Voiture(infos.matricule,infos.marque,infos.type,infos.annee_fabrication,infos.kilometrage,infos.date_arrivee);
    
    this._voitureService.ajouterVoiture(voitureInstance).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/Voitures']);
      }
      ,
      error => console.log(error)
    )
  }

}
