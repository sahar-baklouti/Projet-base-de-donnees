import { Component, OnInit } from '@angular/core';
import { VoitureServiceService } from 'src/app/services/voiture-service.service';
@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  voitures=[]
  constructor(private _voitureService:VoitureServiceService) { }

  ngOnInit(): void {
    this._voitureService.getAllVoitures().subscribe(
      (voituresFromDb)=>{
        this.voitures = voituresFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteVoiture(matricule :String) {
    
    this._voitureService.deleteVoiture(matricule).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>console.log(error)      
    )
  }
  myFunction(){
    let _matricule = (<HTMLInputElement>document.getElementById("myInput")).value;
    this._voitureService.getVoitureByMatriculeRecherche(_matricule).subscribe(
      (VoituresFromDb)=>{
        this.voitures = VoituresFromDb;
          },
      (error)=>{
        console.log(error);
      }
    )
  }

}
