import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technicien } from '../models/technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienServiceService {

  private _getAllTechniciensUrl = "http://localhost:5000/listTechniciens/";
  private _updateTechnicien = "http://localhost:5000/updateTechnicien";
  private _deleteTechnicien = "http://localhost:5000/deleteTechnicien/";
  private _getTechnicienByNum = "http://localhost:5000/getTechnicienNum/";
  private _ajouterTechniciensUrl = "http://localhost:5000/ajouterTechnicien";
  private _getTechnicienByNom = "http://localhost:5000/getTechnicienNom/";
  private _getAllTechniciensInterventionsUrl = "http://localhost:5000/listTechniciensInterventions/";

  constructor(private http: HttpClient) { }
  getAllTechniciens() {
    return this.http.get<any>(this._getAllTechniciensUrl);
  }

 updateTechnicien(TechnicienInstance: Technicien){
    return this.http.put<any>(this._updateTechnicien,TechnicienInstance);
  }

  deleteTechnicien(TechnicienNum: String){
    return this.http.delete<any>(this._deleteTechnicien+TechnicienNum);
  }
  getTechnicienByNum(TechnicienNum: String){
    return this.http.get<any>(this._getTechnicienByNum+TechnicienNum);
  }
  getTechnicienByNom(TechnicienNom: String){
    return this.http.get<any>(this._getTechnicienByNom+TechnicienNom);
  }
  ajouterTechnicien(TechnicienInstance: Technicien){
    return this.http.post<any>(this._ajouterTechniciensUrl,TechnicienInstance); 
  }
  getAllTechniciensForInterventions() {
    return this.http.get<any>(this._getAllTechniciensInterventionsUrl);
  }
}
