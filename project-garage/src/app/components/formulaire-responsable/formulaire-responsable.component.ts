import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Responsable } from 'src/app/models/responsable';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResponsableService } from 'src/app/services/responsable-service.service';
@Component({
  selector: 'app-formulaire-responsable',
  templateUrl: './formulaire-responsable.component.html',
  styleUrls: ['./formulaire-responsable.component.css']
})
export class FormulaireResponsableComponent implements OnInit {
  updateResponsableForm: FormGroup;
  _mot_de_passe:String;
  _est_admin :String;
  _nom :String;
  _prenom:String;
  _id:String;
  data=[]
  constructor(private fb: FormBuilder,private route:ActivatedRoute,  private _responsableService:ResponsableService,private router: Router) {
    let _idRecu =this.route.snapshot.paramMap.get('idResponsable');
    if (_idRecu !=null)
     {
    this._responsableService.getResponsableById(_idRecu).subscribe(
      (ResponsableFromDb)=>{
        this.data = ResponsableFromDb;
        let detailsResponsable=this.data[0]
        this._mot_de_passe=detailsResponsable["mot_de_passe"];
        this._id=detailsResponsable["id"];
        this._prenom=detailsResponsable["prenom"];
        this._nom=detailsResponsable["nom"];
        this.updateResponsableForm.setValue(detailsResponsable);
          },
      (error)=>{
        console.log(error);
      }
    )
    
    
  }

  let formControls = {
    id: new FormControl('', [
      Validators.required,
    ]),
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{1,30}$')
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]{1,30}$')
    ]),
    mot_de_passe: new FormControl('', [
      Validators.required,
    ]),
    est_admin: new FormControl('', [
      Validators.required,
      
    ]),
    

  }

    this.updateResponsableForm = fb.group(formControls);
   }
   get id() { return this.updateResponsableForm.get('id'); }
   get nom() { return this.updateResponsableForm.get('nom'); }
   get prenom() { return this.updateResponsableForm.get('prenom'); }
   get mot_de_passe() { return this.updateResponsableForm.get('mot_de_passe'); }
   get est_admin() { return this.updateResponsableForm.get('est_admin'); }

  ngOnInit(): void {
  }
  updateResponsable(){
    let infos = this.updateResponsableForm.value;
    let responsable = new Responsable(infos.id,infos.nom,infos.prenom,infos.mot_de_passe,infos.est_admin);
    this._responsableService.updateResponsable(responsable).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['Responsables'])
      },
      error => {
        console.log(error);
      }
    )
    

  }


}
