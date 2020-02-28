import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeywordExtractorService {

  public host: string = "https://dev.folivoras.com" ;
constructor(private http: HttpClient) {

 }
 authHeader():HttpHeaders {
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers = headers.append('Accept', 'application/json');

  headers = headers.append('Access-Control-Allow-Origin', '*');
  headers = headers.append('Access-Control-Allow-Credentials', 'true');


  return headers;
}

 public getKeywords(urls): Observable<any> {

  let headers = this.authHeader();
  return this.http.post(this.host,urls, {
    headers
  });
}
}
