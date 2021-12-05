import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { VoitureServiceService } from 'src/app/services/voiture-service.service';
import { IntervensionServiceService } from 'src/app/services/intervension-service.service';
import { ResponsableService } from 'src/app/services/responsable-service.service';
import { CommuneServiceService } from 'src/app/services/commune-service.service';
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  clients_number ='';
  voitures_number ='';
  total_voitures_number ='';
  interventions_number ='';
  estAdmin : boolean;
  constructor(private _clientService:ClientServiceService,private _voitureService:VoitureServiceService,private _communeService:CommuneServiceService,private _responsableService:ResponsableService,private _intervensionService:IntervensionServiceService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    //console.log(token)
    this.estAdmin = this._responsableService.estAdmin();
    this._clientService.getClientsNumber().subscribe(
      (numberFromDb)=>{
        this.clients_number = numberFromDb["count(numero_client)"];
      },
      (error)=>{
        console.log(error);
      }
    )
    this._voitureService.getVoituresNumber().subscribe(
      (numberFromDb)=>{
        this.voitures_number = numberFromDb["count(matricule)"];
      },
      (error)=>{
        console.log(error);
      }
    )
    this._intervensionService.getInterventionsNumber().subscribe(
      (numberFromDb)=>{
        this.interventions_number = numberFromDb["count(*)"];
      },
      (error)=>{
        console.log(error);
      }
    )
    this._communeService.getTotaleVoituresReparees().subscribe(
      (numberFromDb)=>{

        this.total_voitures_number = numberFromDb[0]["total"];
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
