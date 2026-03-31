import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Hono default port is usually 3000 or 8787 if using Wrangler
  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('liceo_token', res.token);
            // You can also store user data returned from Prisma
            localStorage.setItem('user_profile', JSON.stringify(res.user));
          }
        })
      );
  }
}