import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../services/absence.service';
import { HttpClientModule } from '@angular/common/http'; // Import du HttpClientModule
import { CommonModule } from '@angular/common'; // Ajoutez cette importation

import { FormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common'; // Import du FormsModule


@Component({
  selector: 'app-absences',
  standalone: true,
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],

  imports: [HttpClientModule, FormsModule, DatePipe,CommonModule] // Ajout du FormsModule

})
export class AbsencesComponent implements OnInit {
  absences: any[] = [];
  newAbsence: any = { dateAbsence: '', etudiantId: null };

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.absenceService.getAbsences().subscribe(data => {
      this.absences = data;
    });
  }

  addAbsence(): void {
    if (this.newAbsence.dateAbsence && this.newAbsence.motif && this.newAbsence.etudiantId) {
      console.log('Données envoyées au backend:', this.newAbsence); // Debug
      this.absenceService.createAbsence(this.newAbsence).subscribe(
        (absence) => {
          this.absences.push(absence); // Ajoute l'absence à la liste après l'ajout
          this.newAbsence = { dateAbsence: new Date(), motif: '', etudiantId: null }; // Réinitialise le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'absence', error);
        }
      );
    } else {
      console.error('Tous les champs sont obligatoires');
    }
  }


  deleteAbsence(id: number): void {
    this.absenceService.deleteAbsence(id).subscribe(() => {
      this.loadAbsences();
    });
  }
}
