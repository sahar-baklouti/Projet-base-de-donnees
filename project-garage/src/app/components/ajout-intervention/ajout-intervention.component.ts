import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IntervensionServiceService } from 'src/app/services/intervension-service.service';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { VoitureServiceService } from 'src/app/services/voiture-service.service';
import { TechnicienServiceService } from 'src/app/services/technicien-service.service';
import { ForfaitService } from 'src/app/services/forfait.service';
import { Intervention } from 'src/app/models/intervention';
@Component({
  selector: 'app-ajout-intervention',
  templateUrl: './ajout-intervention.component.html',
  styleUrls: ['./ajout-intervention.component.css']
})
export class AjoutInterventionComponent implements OnInit {

  ajoutInterventionForm: FormGroup;
  
  clients=[]
  techniciens=[]
  voitures=[]
  forfaits=[]
  
  constructor(private fb: FormBuilder,private _interventionService:IntervensionServiceService,private _forfaitService:ForfaitService,private _clientService:ClientServiceService,private _technicienService:TechnicienServiceService, private _voitureService:VoitureServiceService,private router: Router) { 
    let formControls = {
      client: new FormControl('', [
        
      ]),
      technicien: new FormControl('', [
        
      ]),
      forfait: new FormControl('', [ 
    
      ]),
      voiture: new FormControl('', [
        
      ]),
    }

    this.ajoutInterventionForm = fb.group(formControls);
  }

  ngOnInit(): void {
    this._clientService.getAllClientsForInterventions().subscribe(
      (clientsFromDb)=>{
        this.clients = clientsFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    this._technicienService.getAllTechniciensForInterventions().subscribe(
      (techniciensFromDb)=>{
        this.techniciens = techniciensFromDb
      },
      (error)=>{
        console.log(error);
      }
    )
    this._voitureService.getAllvoituretsForInterventions().subscribe(
      (voituretsFromDb)=>{
        this.voitures = voituretsFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    this._forfaitService.getAllForfaits().subscribe(
      (forfaitsFromDb)=>{
        this.forfaits = forfaitsFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )

  }
  
  ajouter (){
    let e = <HTMLSelectElement>document.getElementById("client");
	  let _client = e.options[e.selectedIndex].text;
    e = <HTMLSelectElement>document.getElementById("technicien");
	  let _technicien = e.options[e.selectedIndex].text;
    e = <HTMLSelectElement>document.getElementById("voiture");
    let _voiture = e.options[e.selectedIndex].text;
    e = <HTMLSelectElement>document.getElementById("forfait");
    let _forfait = e.options[e.selectedIndex].text;
    let InterventionInstance = new Intervention(_client,_technicien,_voiture,_forfait);
    
    this._interventionService.ajouterIntervention(InterventionInstance).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/Interventions']);
      }
      ,
      error => console.log(error)
    )
  }

}
