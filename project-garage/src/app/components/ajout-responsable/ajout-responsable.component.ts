import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ResponsableService } from 'src/app/services/responsable-service.service';
import { Router } from '@angular/router';
import { Responsable } from 'src/app/models/responsable';

@Component({
  selector: 'app-ajout-responsable',
  templateUrl: './ajout-responsable.component.html',
  styleUrls: ['./ajout-responsable.component.css']
})
export class AjoutResponsableComponent implements OnInit {
  ajoutResponsableForm: FormGroup;
  constructor(private fb: FormBuilder, private _responsableService:ResponsableService,private router: Router ) {
    let formControls = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      mot_de_passe: new FormControl('', [
        Validators.required,
      ]),
      est_admin: new FormControl('', [
        Validators.required,
        
      ]),
      

    }

    this.ajoutResponsableForm = fb.group(formControls);
   }
   get nom() { return this.ajoutResponsableForm.get('nom'); }
   get prenom() { return this.ajoutResponsableForm.get('prenom'); }
   get mot_de_passe() { return this.ajoutResponsableForm.get('mot_de_passe'); }
   get est_admin() { return this.ajoutResponsableForm.get('est_admin'); }
  ngOnInit(): void {
  }
  ajouter (){
    
    let infos = this.ajoutResponsableForm.value;
    let responsableInstance = new Responsable("0",infos.nom,infos.prenom,infos.mot_de_passe,infos.est_admin);
    
    this._responsableService.ajouterResponsable(responsableInstance).subscribe(
      result => {
        this.router.navigate(['/Responsables']);
      }
      ,
      error => console.log(error)
    )
  }

}
