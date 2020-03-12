import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    urlAPI = 'https://reqres.in/api/';

    constructor(
        private http: HttpClient
    ) { }

    getData(url: string) {
        return this.http.get<any>(this.urlAPI + url).pipe(map(
            data => {
                return data;
            }
        ));
    }

    postData(url: string, data: object) {
        return this.http.post<any>(this.urlAPI + url, data);
    }
}
