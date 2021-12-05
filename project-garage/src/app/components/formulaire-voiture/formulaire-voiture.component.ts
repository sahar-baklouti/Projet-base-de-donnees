import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'src/app/services/voiture-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Voiture } from 'src/app/models/voiture';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulaire-voiture',
  templateUrl: './formulaire-voiture.component.html',
  styleUrls: ['./formulaire-voiture.component.css']
})
export class FormulaireVoitureComponent implements OnInit {
  updateVoitureForm: FormGroup;
  
 
  _matricule :String;
  _marque:String;
  _type :String;
  _kilometrage:String;
   _date_entree :String;
   _annee_fabrication :String;
  data=[]
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private _voitureService:VoitureServiceService, private router: Router) { 
    let _matriculeRecu =this.route.snapshot.paramMap.get('matriculeVoiture');
    if (_matriculeRecu !=null)
     {
    this._voitureService.getVoitureByMatricule(_matriculeRecu).subscribe(
      (voitureFromDb)=>{
        this.data = voitureFromDb;
        let detailsvoiture=this.data[0]
        this._matricule=detailsvoiture["matricule"];
        this._marque=detailsvoiture["marque"];
        this._type=detailsvoiture["type"];
        this._kilometrage=detailsvoiture["kilometrage"];
        this._date_entree=detailsvoiture["date_entree"];
        this._annee_fabrication=detailsvoiture["annee_fabrication"];
        this.updateVoitureForm.setValue(detailsvoiture);
          },
      (error)=>{
        console.log(error);
      }
    )
  }
  let formControls = {
    matricule: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z]-[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}-[0-9]{2,3}$')
    ]),
    marque: new FormControl('', [
      Validators.required,
    ]),
    type: new FormControl('', [
      
    ]),
    kilometrage: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*')
    ]),
    date_entree: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9][0-9][0-9][0-9]+\-+[0-1][0-9]+\-+[0-3][0-9]')
    ]),
    annee_fabrication: new FormControl('', [
      Validators.pattern('[0-9]{4}')
    ])}
  this.updateVoitureForm = fb.group(formControls);


  }
  get matricule() { return this.updateVoitureForm.get('matricule'); }
  get date_entree() { return this.updateVoitureForm.get('date_entree'); }
  get annee_fabrication() { return this.updateVoitureForm.get('annee_fabrication'); }
  get kilometrage() { return this.updateVoitureForm.get('kilometrage'); }
  get marque() { return this.updateVoitureForm.get('marque'); }
  get type() { return this.updateVoitureForm.get('type'); }
  ngOnInit(): void {
  }
  updateVoiture(){
    let infos = this.updateVoitureForm.value;
    let voitureInstance = new Voiture(infos.matricule,infos.marque,infos.type,infos.annee_fabrication,infos.kilometrage,infos.date_entree);
    this._voitureService.updateVoiture(voitureInstance).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['Voitures'])
      },
      error => {
        console.log(error);
      }
    )
    

  }

}
