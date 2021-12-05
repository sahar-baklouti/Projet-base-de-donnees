import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commune} from 'src/app/models/commune'; 
@Injectable({
  providedIn: 'root'
})
export class CommuneServiceService {
  private _getAllCommunes = "http://localhost:5000/listCommunes/";
  private _getCommunesNames="http://localhost:5000/nameCommunes/";
  private _deleteCommune = "http://localhost:5000/deleteCommune/";
  private _ajouterCommunesUrl = "http://localhost:5000/ajouterCommune";
  private _getCommuneByNom = "http://localhost:5000/getCommuneNom/";
  private _getTotaleVoituresReparees = "http://localhost:5000/totalVoiture/";
  constructor(private http: HttpClient) { }
  getAllCommunes() {
    return this.http.get<any>(this._getAllCommunes);
  }
  getCommunesNames(){
    return this.http.get<any>(this._getCommunesNames);
  }
  deleteCommune(nom_commune: String){
    return this.http.delete<any>(this._deleteCommune+nom_commune);
  }
  ajouterCommune(CommuneInstance: Commune){
    return this.http.post<any>(this._ajouterCommunesUrl,CommuneInstance); 
  }
  getCommuneByNom(nom_commune: String){
    return this.http.get<any>(this._getCommuneByNom+nom_commune);
  }
  getTotaleVoituresReparees(){
    return this.http.get<any>(this._getTotaleVoituresReparees);
  }

}
