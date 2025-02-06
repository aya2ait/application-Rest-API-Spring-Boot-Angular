import { Component, OnInit } from '@angular/core';
import { EtudiantService, Etudiant } from '../../services/etudiant.service';
import { CommonModule } from '@angular/common'; // Ajoutez cette importation
import { FormsModule } from '@angular/forms';  // Importez FormsModule

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  standalone: true,
  styleUrls: ['./etudiants.component.css'],
  imports: [CommonModule,FormsModule] // Ajoutez CommonModule dans les imports

})
export class EtudiantsComponent implements OnInit {
  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;

  newEtudiant: Etudiant = {
    nom: '',
    prenom: '',
    dateNaissance: new Date(),
    absences: []
  };

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }
  // Sélectionner un étudiant pour la mise à jour
  selectEtudiant(etudiant: Etudiant): void {
    this.selectedEtudiant = { ...etudiant };  // Crée une copie de l'étudiant pour l'éditer
  }

  // Mettre à jour l'étudiant
  updateEtudiant(): void {
    if (this.selectedEtudiant) {
      this.etudiantService.updateEtudiant(this.selectedEtudiant).subscribe(updatedEtudiant => {
        const index = this.etudiants.findIndex(etudiant => etudiant.id === updatedEtudiant.id);
        if (index !== -1) {
          this.etudiants[index] = updatedEtudiant;  // Remplace l'étudiant dans la liste avec l'étudiant mis à jour
        }
        this.selectedEtudiant = null;  // Réinitialise le formulaire de mise à jour
      });
    }
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        console.log('Données récupérées:', data);
        this.etudiants = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
      }
    );
  }

  deleteEtudiant(id: number | undefined): void {
    if (id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe(
        () => {
          this.loadEtudiants(); // Recharge la liste des étudiants après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'étudiant', error);
        }
      );
    } else {
      console.error('ID de l\'étudiant est indéfini');
    }
  }
  addEtudiant(): void {
    if (this.newEtudiant.nom && this.newEtudiant.prenom && this.newEtudiant.dateNaissance) {
      this.etudiantService.addEtudiant(this.newEtudiant).subscribe(
        (etudiant) => {
          this.etudiants.push(etudiant); // Ajoute l'étudiant à la liste après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        }
      );
    }
  }



}
