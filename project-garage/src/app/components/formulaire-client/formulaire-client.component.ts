import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ResponsableService } from 'src/app/services/responsable-service.service';
import { CommuneServiceService } from 'src/app/services/commune-service.service';
@Component({
  selector: 'app-formulaire-client',
  templateUrl: './formulaire-client.component.html',
  styleUrls: ['./formulaire-client.component.css']
})
export class FormulaireClientComponent implements OnInit {
  updateClientForm: FormGroup;
  _responsable:String;
  _num :String;
  _nom :String;
  _prenom:String;
   _adresse :String;
  data=[]
  responsables =[]
  communes=[]
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private _clientService:ClientServiceService,private _communeService:CommuneServiceService,  private _responsableService:ResponsableService,private router: Router) { 
    let _numRecu =this.route.snapshot.paramMap.get('numClient');
    if (_numRecu !=null)
     {
    this._clientService.getClientByNum(_numRecu).subscribe(
      (clientFromDb)=>{
        this.data = clientFromDb;
        let detailsClient=this.data[0]
        this._responsable=detailsClient["responsable"];
        this._num=detailsClient["num"];
        this._prenom=detailsClient["prenom"];
        this._adresse=detailsClient["adresse"];
        this._nom=detailsClient["nom"];
        this.updateClientForm.setValue(detailsClient);
          },
      (error)=>{
        console.log(error);
      }
    )
    this._responsableService.getAllResponsablesNames().subscribe(
      (responsablesFromDb)=>{
        this.responsables = responsablesFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    this._communeService.getCommunesNames().subscribe(
      (communesFromDb)=>{
        this.communes = communesFromDb;
      },
      (error)=>{
        console.log(error);
      }
    )
    
    
  }

    let formControls = {
      num: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      prenom: new FormControl('', [
        Validators.required,

        Validators.pattern('[a-zA-Z ]{1,30}$')
      ]),
      adresse: new FormControl('', [
        
      ]),
      responsable: new FormControl('', [
      ])
    }
    this.updateClientForm = fb.group(formControls);
  }
  get num() { return this.updateClientForm.get('num'); }
  get nom() { return this.updateClientForm.get('nom'); }
  get prenom() { return this.updateClientForm.get('prenom'); }
  get adresse() { return this.updateClientForm.get('adresse'); }
  get responsable() { return this.updateClientForm.get('responsable'); }
  

  ngOnInit(): void {
 

  }
  
  
  updateClient(){
    let infos = this.updateClientForm.value;
    let client = new Client(infos.num,infos.prenom,infos.nom,infos.adresse,infos.responsable);
    this._clientService.updateClient(client).subscribe(
      result => {
        console.log(result)
        this.router.navigate(['Clients'])
      },
      error => {
        console.log(error);
      }
    )
    

  }


}
