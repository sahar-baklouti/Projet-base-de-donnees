import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TechnicienServiceService } from 'src/app/services/technicien-service.service';
import { Technicien } from 'src/app/models/technicien';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajout-technicien',
  templateUrl: './ajout-technicien.component.html',
  styleUrls: ['./ajout-technicien.component.css']
})
export class AjoutTechnicienComponent implements OnInit {

  ajoutTechnicienForm: FormGroup;
  constructor(private fb: FormBuilder,private _TechnicienService:TechnicienServiceService, private router: Router) {
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

    this.ajoutTechnicienForm = fb.group(formControls);
   }
   get nom() { return this.ajoutTechnicienForm.get('nom'); }
   get prenom() { return this.ajoutTechnicienForm.get('prenom'); }
   get nb_voiture() { return this.ajoutTechnicienForm.get('nb_voiture'); }
  ngOnInit(): void {
  }
  ajouter (){
    
    let infos = this.ajoutTechnicienForm.value;
    let TechnicienInstance = new Technicien('0',infos.nom,infos.prenom,infos.nb_voiture);
    
    this._TechnicienService.ajouterTechnicien(TechnicienInstance).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/Techniciens']);
      }
      ,
      error => console.log(error)
    )
  }
}
