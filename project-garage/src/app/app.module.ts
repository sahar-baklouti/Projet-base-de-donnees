import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponentComponent } from './components/client-component/client-component.component';

import { VoitureComponent } from './components/voiture/voiture.component';
import { FormulaireClientComponent } from './components/formulaire-client/formulaire-client.component';
import { AjoutClientComponent } from './components/ajout-client/ajout-client.component';
import { IntervensionComponent } from './components/intervension/intervension.component';
import { AjoutInterventionComponent } from './components/ajout-intervention/ajout-intervention.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AjoutVoitureComponent } from './components/ajout-voiture/ajout-voiture.component';
import { FormulaireVoitureComponent } from './components/formulaire-voiture/formulaire-voiture.component';
import { TechnicienComponent } from './components/technicien/technicien.component';
import { FormulaireTechnicienComponent } from './components/formulaire-technicien/formulaire-technicien.component';
import { AjoutTechnicienComponent } from './components/ajout-technicien/ajout-technicien.component';
import { HeaderComponent } from './components/header/header.component';
import { CommuneComponent } from './components/commune/commune.component';
import { AjoutCommuneComponent } from './components/ajout-commune/ajout-commune.component';
import { LoginComponent } from './components/login/login.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { AjoutResponsableComponent } from './components/ajout-responsable/ajout-responsable.component';
import { FormulaireResponsableComponent } from './components/formulaire-responsable/formulaire-responsable.component';
import { AjoutCommentaireComponent } from './components/ajout-commentaire/ajout-commentaire.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponentComponent,
    VoitureComponent,
    FormulaireClientComponent,
    AjoutClientComponent,
    IntervensionComponent,
    AjoutInterventionComponent,
    AcceuilComponent,
    AjoutVoitureComponent,
    FormulaireVoitureComponent,
    TechnicienComponent,
    FormulaireTechnicienComponent,
    AjoutTechnicienComponent,
    HeaderComponent,
    CommuneComponent,
    AjoutCommuneComponent,
    LoginComponent,
    ResponsableComponent,
    AjoutResponsableComponent,
    FormulaireResponsableComponent,
    AjoutCommentaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
