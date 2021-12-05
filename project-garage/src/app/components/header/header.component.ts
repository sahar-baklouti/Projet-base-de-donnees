import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/services/responsable-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  estAdmin : boolean
  constructor(private _responsableService :ResponsableService,private router :Router ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.estAdmin = this._responsableService.estAdmin(); 
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }


}
