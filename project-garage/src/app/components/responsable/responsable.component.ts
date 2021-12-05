import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/services/responsable-service.service';
@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {
  responsables =[]
  constructor(private _responsableService:ResponsableService) { }

  ngOnInit(): void {
    this._responsableService.getAllResponsables().subscribe(
      (responsablesFromDb)=>{
        this.responsables = responsablesFromDb;
        for (let i = 0; i < this.responsables.length; i++) {
          if(this.responsables[i]["est_admin"]=="1"){
            this.responsables[i]["est_admin"]="oui"
          }
          else {
            this.responsables[i]["est_admin"]="non"
          }
        }
        
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  myFunction(){
    let _nom = (<HTMLInputElement>document.getElementById("myInput")).value;
    this._responsableService.getResponsableByNom(_nom).subscribe(
      (responsablesFromDb)=>{
        this.responsables = responsablesFromDb;
          },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteResponsable(ResponsableId:String) {
    
    this._responsableService.deleteResponsable(ResponsableId).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>console.log(error)      
    )
  }

}

