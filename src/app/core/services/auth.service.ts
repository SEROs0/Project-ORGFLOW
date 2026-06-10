import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API = 'http://localhost:8000/auth';

  currentUser = signal<User | null>(null);

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.API}/login`, { email, password }, { withCredentials: true })
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  register(email: string, password: string, full_name: string) {
    return this.http.post<User>(
      `${this.API}/register`,
      { email, password, full_name },
      { withCredentials: true }
    );
  }

  me() {
    return this.http
      .get<User>(`${this.API}/me`, { withCredentials: true })
      .pipe(tap((user) => this.currentUser.set(user)));
  }

  logout() {
    return this.http
      .post<void>(`${this.API}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUser.set(null);
          this.router.navigate(['/login']);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
