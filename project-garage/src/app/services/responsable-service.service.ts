import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private _getAllResponsablesNames = "http://localhost:5000/listResponsablesNames/";
  private _getAllResponsables = "http://localhost:5000/listResponsable/";
  private _loginUrl = "http://localhost:5000/login/";
  private _ajouterResponsablesUrl = "http://localhost:5000/ajouterResponsable";
  private _getResponsableByNom = "http://localhost:5000/getResponsableNom/";
  private _deleteResponsable = "http://localhost:5000/deleteResponsable/";
  private _getResponsableById = "http://localhost:5000/getResponsableId/";
  private _updateResponsable = "http://localhost:5000/updateResponsable";
  constructor(private http: HttpClient) { }
  getAllResponsablesNames() {
    return this.http.get<any>(this._getAllResponsablesNames);
  }
  getAllResponsables() {
    return this.http.get<any>(this._getAllResponsables);
  }
  loginUser(login : string, mot_de_passe: string) {
    let connexion = login+'&'+mot_de_passe
    return this.http.get<any>(this._loginUrl+connexion);
  }
  ajouterResponsable(ResponsableInstance: Responsable){
    return this.http.post<any>(this._ajouterResponsablesUrl,ResponsableInstance); 

  }
  getResponsableByNom(ResponsableNom: String){
    return this.http.get<any>(this._getResponsableByNom+ResponsableNom);
  }
  deleteResponsable(responsableId : String){
    return this.http.delete<any>(this._deleteResponsable+responsableId);
  }
  getResponsableById(ResponsableId: String){
    return this.http.get<any>(this._getResponsableById+ResponsableId);
  }
  updateResponsable(responsableInstance: Responsable){
    return this.http.put<any>(this._updateResponsable,responsableInstance);

  }
  estAdmin() {
    let token = localStorage.getItem('token');
    if (token) {

      if (token == "1") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  /* estResponsable() {
    let token = localStorage.getItem('token');
    if (token) {

      if (token == "0") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } */

}

