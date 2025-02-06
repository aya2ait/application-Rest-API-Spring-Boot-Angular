import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtudiantService, Etudiant } from '../services/etudiant.service';

export interface Absence {
  id?: number;
  dateAbsence: Date;
  motif: string;
  etudiant: Etudiant; // Associe l'objet étudiant

  // Ajoutez d'autres champs si nécessaire
}
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8080/api/absences';

  constructor(private http: HttpClient) {}

  getAbsences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAbsenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAbsence(absence: any): Observable<any> {
    const payload = {
      dateAbsence: absence.dateAbsence,
      motif: absence.motif,
      etudiant: { id: absence.etudiantId }  // Assurez-vous que l'objet 'etudiant' contient juste l'ID
    };
    return this.http.post<any>('http://localhost:8080/api/absences', payload);
  }


  updateAbsence(id: number, absence: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, absence);
  }

  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
