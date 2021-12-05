import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
@Component({
  selector: 'app-client-component',
  templateUrl: './client-component.component.html',
  styleUrls: ['./client-component.component.css']
})
export class ClientComponentComponent implements OnInit {
  clients = [];
  constructor(private _clientService:ClientServiceService) { }

  ngOnInit(): void {
    this._clientService.getAllClients().subscribe(
      (clientsFromDb)=>{
        this.clients = clientsFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  deleteClient(clientNum:String) {
    
    this._clientService.deleteClient(clientNum).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
        console.log(this.clients)
      },
      error=>console.log(error)      
    )
  }
  myFunction(){
    let _nom = (<HTMLInputElement>document.getElementById("myInput")).value;
    this._clientService.getClientByNom(_nom).subscribe(
      (clientsFromDb)=>{
        this.clients = clientsFromDb;
        //this.ngOnInit()
          },
      (error)=>{
        console.log(error);
      }
    )
  }

  

}
