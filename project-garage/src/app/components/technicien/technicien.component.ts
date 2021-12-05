import { Component, OnInit } from '@angular/core';
import { TechnicienServiceService } from 'src/app/services/technicien-service.service';
@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {
  techniciens=[]
  constructor(private _technicienService:TechnicienServiceService) { }

  ngOnInit(): void {
    this._technicienService.getAllTechniciens().subscribe(
      (techniciensFromDb)=>{
        this.techniciens = techniciensFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteTechnicien(num :String) {
    
    this._technicienService.deleteTechnicien(num).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>console.log(error)      
    )
  }
  myFunction(){
    let _nom = (<HTMLInputElement>document.getElementById("myInput")).value;
    this._technicienService.getTechnicienByNom(_nom).subscribe(
      (techniciensFromDb)=>{
        this.techniciens = techniciensFromDb;
          },
      (error)=>{
        console.log(error);
      }
    )
  }

}
