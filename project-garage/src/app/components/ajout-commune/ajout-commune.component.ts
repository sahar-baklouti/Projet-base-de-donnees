import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommuneServiceService } from 'src/app/services/commune-service.service';
import {Commune} from 'src/app/models/commune';
@Component({
  selector: 'app-ajout-commune',
  templateUrl: './ajout-commune.component.html',
  styleUrls: ['./ajout-commune.component.css']
})
export class AjoutCommuneComponent implements OnInit {
  ajoutCommuneForm: FormGroup;
  constructor(private fb: FormBuilder,private _communeService:CommuneServiceService, private router: Router) {
    let formControls = {
      nom_commune: new FormControl('', [
        Validators.required,
      ]),
      
    }
    this.ajoutCommuneForm = fb.group(formControls);}
    get nom_commune() { return this.ajoutCommuneForm.get('nom_commune'); }

 
  
  ngOnInit(): void {
  }
  ajouter (){
    
    let infos = this.ajoutCommuneForm.value;
    let CommuneInstance = new Commune(infos.nom_commune,'0');
    
    this._communeService.ajouterCommune(CommuneInstance).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/Communes']);
      }
      ,
      error => console.log(error)
    )
  }

}
