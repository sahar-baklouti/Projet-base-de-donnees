import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Router } from '@angular/router';
import {Client} from 'src/app/models/client'
import { CommuneServiceService } from 'src/app/services/commune-service.service';
import { ResponsableService } from 'src/app/services/responsable-service.service';
@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit {
  ajoutClientForm: FormGroup;
  communes = []
  responsables =[]
  constructor(private fb: FormBuilder,private _clientService:ClientServiceService, private _responsableService:ResponsableService,private router: Router,private _communeService : CommuneServiceService ) { 
    let formControls = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      adresse: new FormControl('', [
        
      ]),
      responsable: new FormControl('', [
        
        
      ]),
      

    }

    this.ajoutClientForm = fb.group(formControls);
  }
  get nom() { return this.ajoutClientForm.get('nom'); }
  get prenom() { return this.ajoutClientForm.get('prenom'); }
  get adresse() { return this.ajoutClientForm.get('adresse'); }
  get responsable() { return this.ajoutClientForm.get('responsable'); }
  


  ngOnInit(): void {
    this._communeService.getCommunesNames().subscribe(
      (communesFromDb)=>{
        this.communes = communesFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    this._responsableService.getAllResponsablesNames().subscribe(
      (responsablesFromDb)=>{
        this.responsables = responsablesFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }
  ajouter (){
    let e = <HTMLSelectElement>document.getElementById("adresse");
  let _adr = e.options[e.selectedIndex].text;
    e = <HTMLSelectElement>document.getElementById("responsable");
  let _respo = e.options[e.selectedIndex].text;

    let infos = this.ajoutClientForm.value;
    let clientInstance = new Client("0",infos.prenom,infos.nom,_adr,_respo);
    
    this._clientService.ajouterClient(clientInstance).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/Clients']);
      }
      ,
      error => console.log(error)
    )
  }

}
