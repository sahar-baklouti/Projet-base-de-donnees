import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Technicien } from 'src/app/models/technicien';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TechnicienServiceService } from 'src/app/services/technicien-service.service';

@Component({
  selector: 'app-formulaire-technicien',
  templateUrl: './formulaire-technicien.component.html',
  styleUrls: ['./formulaire-technicien.component.css']
})
export class FormulaireTechnicienComponent implements OnInit {

  updateTechnicienForm: FormGroup;
  
 
  _numero_tech :String;
  _nom:String;
  _prenom :String;
   _nb_voiture :String;

  data=[]
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private _technicienService:TechnicienServiceService, private router: Router) { 
    let _numero_techRecu =this.route.snapshot.paramMap.get('numTechnicien');
    if (_numero_techRecu !=null)
     {
    this._technicienService.getTechnicienByNum(_numero_techRecu).subscribe(
      (TechnicienFromDb)=>{
        this.data = TechnicienFromDb;
        let detailsTechnicien=this.data[0]
        this._numero_tech=detailsTechnicien["numero_tech"];
        this._nom=detailsTechnicien["nom"];
        this._prenom=detailsTechnicien["prenom"];
        this._nb_voiture=detailsTechnicien["nb_voiture"];
        this.updateTechnicienForm.setValue(detailsTechnicien);
          },
      (error)=>{
        console.log(error);
      }
    )
  }
  let formControls = {
    numero_tech: new FormControl('', [
    ]),
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    nb_voiture: new FormControl('', [
      Validators.pattern('[0-9]*')
    ]),
    }
  this.updateTechnicienForm = fb.group(formControls);


  }
  get numero_tech() { return this.updateTechnicienForm.get('numero_tech'); }
  get nom() { return this.updateTechnicienForm.get('nom'); }
  get prenom() { return this.updateTechnicienForm.get('prenom'); }
  get nb_voiture() { return this.updateTechnicienForm.get('nb_voiture'); }
 
  
 
  ngOnInit(): void {
  }
  updateTechnicien(){
    let infos = this.updateTechnicienForm.value;
    let technicien = new Technicien(infos.numero_tech,infos.nom,infos.prenom,infos.nb_voiture);
    this._technicienService.updateTechnicien(technicien).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['Techniciens'])
      },
      error => {
        console.log(error);
      }
    )
    

  }

}
