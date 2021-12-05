import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsableService } from 'src/app/services/responsable-service.service';
import { Responsable } from 'src/app/models/responsable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  retour=[];
  erreur=0;
  constructor(private fb: FormBuilder, private _ResponsableService:ResponsableService,private router: Router) { 
    let formControls = {
      login: new FormControl('', [
        Validators.required,
      ]),
      mot_de_passe: new FormControl('', [
        Validators.required,
      ])
    }

    this.loginForm = fb.group(formControls);
  }
  get login() { return this.loginForm.get('login'); }
  get mot_de_passe() { return this.loginForm.get('mot_de_passe'); }

  ngOnInit(): void {
  }
  valider(){
  
    let data = this.loginForm.value;
    
    this._ResponsableService.loginUser(data.login, data.mot_de_passe).subscribe(
      result => {
        this.retour=result[0]
       
        
        if(result.length != 0 ){
          localStorage.setItem('token', this.retour['est_admin']);
          this.router.navigate(['/Acceuil']);
        }
        else {
          this.erreur=1;
          this.router.navigate(['']);} 
        
        

      },
      error => {
        console.log(error);
      }
    );

  }

}
