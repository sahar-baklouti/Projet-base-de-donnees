import { Component, OnInit } from '@angular/core';
import { CommuneServiceService } from 'src/app/services/commune-service.service';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {
  communes = []
  constructor(private _communeService:CommuneServiceService) { }

  ngOnInit(): void {
    this._communeService.getAllCommunes().subscribe(
      (communesFromDb)=>{
        this.communes = communesFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  myFunction(){
    let _nom = (<HTMLInputElement>document.getElementById("myInput")).value;
     this._communeService.getCommuneByNom(_nom).subscribe(
      (communesFromDb)=>{
        this.communes = communesFromDb;
          },
      (error)=>{
        console.log(error);
      }
    ) 
  }
  deleteCommune(nom_commune:String) {
    this._communeService.deleteCommune(nom_commune).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>console.log(error)      
    )
  }

}
