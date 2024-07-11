import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    getUser(word: string): Observable<any> {
        return this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    }
}