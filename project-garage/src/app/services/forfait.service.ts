import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ForfaitService {
  private _getAllForfaits = "http://localhost:5000/listForfaits/";
  constructor(private http: HttpClient) { }
  getAllForfaits() {
    return this.http.get<any>(this._getAllForfaits);
  }
}
