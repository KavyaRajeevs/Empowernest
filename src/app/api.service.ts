import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'your-api-base-url'; // Replace with your actual API base URL

  constructor(private http: HttpClient) { }

  /**
   * Fetch category data via POST request
   * @param category - The category parameter for the URL
   * @param requestBody - The data to send in the POST request body
   * @returns Observable with the API response
   */
  fetchCategory(category: string, requestBody: any): Observable<any> {
    const url = `${this.baseUrl}/v1/udemy/category/${category}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, requestBody, { headers });
  }
}
