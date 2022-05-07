import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { mapToClass } from 'src/app/@utils/operators/operators';
import { RestorePassRequest } from 'src/app/models/RestorePassword';
import { SignInRequest } from 'src/app/models/SignIn';
import { SignUpRequest } from 'src/app/models/SignUp';
import { TokenResponse } from 'src/app/models/Token';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.api.auth;

  private logged$ = new BehaviorSubject<boolean>(false);

  get isLogged(): boolean {
    return this.logged$.getValue();
  }

  get isLogged$(): Observable<boolean> {
    return this.logged$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.setLogged();
  }

  signIn(signIn: SignInRequest): Observable<TokenResponse> {
    return this.http
      .post(`${this.baseURL}/login`, signIn)
      .pipe(
        mapToClass(TokenResponse),
        tap(this.setUserDataToStorage.bind(this))
      );
  }

  signUp(signUp: SignUpRequest): Observable<TokenResponse> {
    return this.http
      .post(`${this.baseURL}/sign-up`, signUp)
      .pipe(
        mapToClass(TokenResponse),
        tap(this.setUserDataToStorage.bind(this))
      );
  }

  requestPass(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/request-pass`, { email });
  }

  restorePass(body: RestorePassRequest): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.baseURL}/restore-pass`, body)
      .pipe(
        mapToClass(TokenResponse),
        tap(this.setUserDataToStorage.bind(this))
      );
  }

  settings(): Observable<any> {
    return this.http.get<any>(`${environment.api.settings}/current`);
  }

  logout(): void {
    this.logged$.next(false);
    this.storageService.clear();
  }

  private setUserDataToStorage(jwtData: TokenResponse): void {
    this.logged$.next(true);
    this.storageService.jwtData = jwtData;
  }

  private setLogged(): void {
    const { jwtData } = this.storageService;

    if (jwtData) {
      this.logged$.next(true);
    }
  }
}
