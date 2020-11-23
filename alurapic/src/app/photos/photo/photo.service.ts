import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API = 'http://localhost:3000';


@Injectable({ providedIn: 'root'})
export class PhotoService {
    static listFromUser(arg0: string) {
      throw new Error('Method not implemented.');
    }
    
    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {

        return this.http
        .get<Object[]>(API + '/flavio/photos');
    }
}