import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponentComponent } from './components/client-component/client-component.component';
import { FormulaireClientComponent } from './components/formulaire-client/formulaire-client.component';
import { AjoutClientComponent } from './components/ajout-client/ajout-client.component';
import { IntervensionComponent } from './components/intervension/intervension.component';
import { AjoutInterventionComponent } from './components/ajout-intervention/ajout-intervention.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { VoitureComponent } from './components/voiture/voiture.component';
import { AjoutVoitureComponent } from './components/ajout-voiture/ajout-voiture.component';
import { FormulaireVoitureComponent } from './components/formulaire-voiture/formulaire-voiture.component';
import { TechnicienComponent } from './components/technicien/technicien.component';
import { FormulaireTechnicienComponent } from './components/formulaire-technicien/formulaire-technicien.component';
import { AjoutTechnicienComponent } from './components/ajout-technicien/ajout-technicien.component';
import { CommuneComponent } from './components/commune/commune.component';
import { AjoutCommuneComponent } from './components/ajout-commune/ajout-commune.component';
import { LoginComponent } from './components/login/login.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { AjoutResponsableComponent } from './components/ajout-responsable/ajout-responsable.component';
import { FormulaireResponsableComponent } from './components/formulaire-responsable/formulaire-responsable.component';
import { AuthentificationGuard } from './guards/authentification.guard';

const routes: Routes = [{
  path: '',
  component: LoginComponent,
},
{
  path: 'updateClient/:numClient',
  component: FormulaireClientComponent,
  
},
{
  path: 'updateVoiture/:matriculeVoiture',
  component: FormulaireVoitureComponent,
  
},
{
  path: 'updateTechnicien/:numTechnicien',
  component: FormulaireTechnicienComponent,
  
},
{
  path: 'updateResponsable/:idResponsable',
  component: FormulaireResponsableComponent,
  
},
{
  path: 'Acceuil',
  component: AcceuilComponent,
  canActivate: [AuthentificationGuard]
  
},
{
  path: 'Clients',
  component: ClientComponentComponent,
  
},
{
  path: 'Responsables',
  component: ResponsableComponent,
  
},
{
  path: 'Communes',
  component: CommuneComponent,
  
},
{
  path: 'Techniciens',
  component: TechnicienComponent,
  
},
{
  path: 'Interventions',
  component: IntervensionComponent,
  
},
{
  path: 'Voitures',
  component: VoitureComponent,
  
},
{
  path: 'addClient',
  component: AjoutClientComponent,
  
},
{
  path: 'addResponsable',
  component: AjoutResponsableComponent,
  
},
{
  path: 'addCommune',
  component: AjoutCommuneComponent,
  
},
{
  path: 'addTechnicien',
  component: AjoutTechnicienComponent,
  
},
{
  path: 'addVoiture',
  component: AjoutVoitureComponent,
  
},
{
  path: 'addIntervention',
  component: AjoutInterventionComponent,
  
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
