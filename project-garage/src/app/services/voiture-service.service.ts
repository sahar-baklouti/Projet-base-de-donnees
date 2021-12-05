import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Voiture } from '../models/voiture';
@Injectable({
  providedIn: 'root'
})
export class VoitureServiceService {

  private _getAllVoituresUrl = "http://localhost:5000/listVoitures/";
  private _updateVoiture = "http://localhost:5000/updateVoiture";
  private _deleteVoiture = "http://localhost:5000/deleteVoiture/";
  private _getVoitureByMatriculeRecherche= "http://localhost:5000/getVoitureMatriculeRecherche/";
  private _ajouterVoituresUrl = "http://localhost:5000/ajouterVoiture";
  private _getVoitureByMatricule = "http://localhost:5000/getVoitureMatricule/";
  private _getVoituresNumber = "http://localhost:5000/getVoituresNumber/";
  private _getAllVoituresInterventionsUrl = "http://localhost:5000/listVoituresInterventions/";

  constructor(private http: HttpClient) { }
  getAllVoitures() {
    return this.http.get<any>(this._getAllVoituresUrl);
  }

 updateVoiture(VoitureInstance: Voiture){
    return this.http.put<any>(this._updateVoiture,VoitureInstance);
    //return this.http.get<any>(this._updateVoiture);
  }

  deleteVoiture(matricule: String){
    return this.http.delete<any>(this._deleteVoiture+matricule);
  }
  getVoitureByMatriculeRecherche(matricule: String){
    return this.http.get<any>(this._getVoitureByMatriculeRecherche+matricule);
  }
  getVoitureByMatricule(VoitureMatricule: String){
    return this.http.get<any>(this._getVoitureByMatricule+VoitureMatricule);
  }
  ajouterVoiture(VoitureInstance: Voiture){
    return this.http.post<any>(this._ajouterVoituresUrl,VoitureInstance); 
  }
  getVoituresNumber(){
    return this.http.get<any>(this._getVoituresNumber);
  }
  getAllvoituretsForInterventions() {
    return this.http.get<any>(this._getAllVoituresInterventionsUrl);
  }
  
}
