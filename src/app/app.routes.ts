import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { AbsencesComponent } from './components/absences/absences.component';


export const routes: Routes = [
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'absences', component: AbsencesComponent },
  { path: '', redirectTo: '/absences', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
