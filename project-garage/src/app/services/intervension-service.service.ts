import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intervention } from '../models/intervention';
@Injectable({
  providedIn: 'root'
})
export class IntervensionServiceService {
  private _getAllInterventionsUrl = "http://localhost:5000/listInterventions/";
  private _deleteIntervention = "http://localhost:5000/deleteIntervention/";
  private _ajouterInterventionsUrl = "http://localhost:5000/ajouterIntervention";
  private _getInterventionByNom = "http://localhost:5000/getInterventionNomTechnicien/";
  private _getInterventionsNumber = "http://localhost:5000/getInterventionsNumber/";
  constructor(private http: HttpClient) { }
  getAllInterventions() {
    return this.http.get<any>(this._getAllInterventionsUrl);
  }


  deleteIntervention(InterventionDescription: string){
    return this.http.delete<any>(this._deleteIntervention+InterventionDescription);
  }
  getInterventionByNomTechnicien(TechnicienNom: String){
    return this.http.get<any>(this._getInterventionByNom+TechnicienNom);
  }
  ajouterIntervention(interventionInstance: Intervention){
    return this.http.post<any>(this._ajouterInterventionsUrl,interventionInstance); 
    //return this.http.get<any>(this._ajouterInterventionsUrl);
  }
  getInterventionsNumber(){
    return this.http.get<any>(this._getInterventionsNumber);
  }
}
