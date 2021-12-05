import { Component, OnInit } from '@angular/core';
import { Intervention } from 'src/app/models/intervention';
import { IntervensionServiceService } from 'src/app/services/intervension-service.service';
@Component({
  selector: 'app-intervension',
  templateUrl: './intervension.component.html',
  styleUrls: ['./intervension.component.css']
})
export class IntervensionComponent implements OnInit {

  interventions = [];
  constructor(private _interventionService:IntervensionServiceService) { }

  ngOnInit(): void {
    this._interventionService.getAllInterventions().subscribe(
      (clientsFromDb)=>{
        this.interventions = clientsFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteIntervention(client:String,voiture:string,technicien:string,forfait:string) {
    let interventionDescription = client+"&"+voiture+"&"+technicien+"&"+forfait
    this._interventionService.deleteIntervention(interventionDescription).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>console.log(error)      
    )
  }
  myFunction(){
    let _nom = (<HTMLInputElement>document.getElementById("myInput")).value;
    this._interventionService.getInterventionByNomTechnicien(_nom).subscribe(
      (clientsFromDb)=>{
        this.interventions = clientsFromDb;
          },
      (error)=>{
        console.log(error);
      }
    )
  }

}
