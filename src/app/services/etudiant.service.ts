import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Absence {
  id?: number;
  dateAbsence: Date;
  motif: string;
  // Ajoutez d'autres champs si nécessaire
}





export interface Etudiant {
  id?: number;
  nom: string;
  prenom: string;
  // Ajoutez d'autres champs si nécessaire
  dateNaissance:Date;
  absences: Absence[];  // Ajout de la propriété absences

}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8080/etudiants';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des étudiants, y compris leurs absences
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  // Récupérer un étudiant par ID, avec ses absences
  getEtudiantById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un étudiant
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant);
  }

  // Mettre à jour un étudiant
  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(this.apiUrl, etudiant);
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

