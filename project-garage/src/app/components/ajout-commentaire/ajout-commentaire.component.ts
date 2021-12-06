import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { IntervensionServiceService } from 'src/app/services/intervension-service.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-ajout-commentaire',
  templateUrl: './ajout-commentaire.component.html',
  styleUrls: ['./ajout-commentaire.component.css']
})
export class AjoutCommentaireComponent implements OnInit {
  ajoutCommentaireForm: FormGroup;
  _commentaire=""
  _clientRecu=""
  _technicienRecu=""
  _matriculeRecu=""
  constructor(private fb: FormBuilder,private _interventionService:IntervensionServiceService, private router: Router,private route:ActivatedRoute,) {
    let _interventiontRecu =this.route.snapshot.paramMap.get('intervention');
    let details = _interventiontRecu.split("&")
    this._clientRecu =details[0]
    this._technicienRecu =details[2]
    this._matriculeRecu =details[1]
    let interventionDescription= this._clientRecu+"&"+this._matriculeRecu+"&"+this._technicienRecu
    this._interventionService.getCommentaireIntervention(interventionDescription).subscribe(
      (commentaireFromDb)=>{
        this._commentaire = commentaireFromDb['commentaire'];
        console.log('this._commentaire')
      },
      (error)=>{
        console.log(error);
      }
    )
    let formControls = {
      commentaire: new FormControl('', [
       
      ]),
      
    }
    this.ajoutCommentaireForm = fb.group(formControls);}
    get commentaire() { return this.ajoutCommentaireForm.get('commentaire');
  }

  ngOnInit(): void {
  }
  ajouter(){
    
    let infos = this.ajoutCommentaireForm.value;
    let commentaire = infos.commentaire
    commentaire = commentaire.replaceAll(" ","-")
    let interventionDescription = this._clientRecu+"&"+this._matriculeRecu+"&"+this._technicienRecu+"&"+commentaire
    console.log(interventionDescription)
     this._interventionService.ajouterCommentaireIntervention(interventionDescription).subscribe(
      (result)=>{
        console.log(result);
        this.router.navigate(['/Interventions']);
      },
      (error)=>{
        console.log(error);
      }
    ) 


  }

}
