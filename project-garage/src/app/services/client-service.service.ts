import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client} from 'src/app/models/client';
@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private _getAllClientsUrl = "http://localhost:5000/listClients/";
  private _updateClient = "http://localhost:5000/updateClient";
  private _deleteClient = "http://localhost:5000/deleteClient/";
  private _getClientByNum = "http://localhost:5000/getClientNum/";
  private _ajouterClientsUrl = "http://localhost:5000/ajouterClient";
  private _getClientByNom = "http://localhost:5000/getClientNom/";
  private _getClientsNumber = "http://localhost:5000/getClientsNumber/";
  private _getAllClientsInterventionsUrl = "http://localhost:5000/listClientsInterventions/";

  constructor(private http: HttpClient) { }
  getAllClients() {
    return this.http.get<any>(this._getAllClientsUrl);
  }

 updateClient(clientInstance: Client){
    return this.http.put<any>(this._updateClient,clientInstance);
  }

  deleteClient(clientNum: String){
    return this.http.delete<any>(this._deleteClient+clientNum);
  }
  getClientByNum(clientNum: String){
    return this.http.get<any>(this._getClientByNum+clientNum);
  }
  getClientByNom(clientNom: String){
    return this.http.get<any>(this._getClientByNom+clientNom);
  }
  ajouterClient(clientInstance: Client){
    return this.http.post<any>(this._ajouterClientsUrl,clientInstance); 
    
  }
  getClientsNumber(){
    return this.http.get<any>(this._getClientsNumber);
  }
  getAllClientsForInterventions() {
    return this.http.get<any>(this._getAllClientsInterventionsUrl);
  }
  
}
