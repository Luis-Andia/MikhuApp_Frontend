import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Chatiaservice {
    private apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${environment.geminiApiKey}`;
    private http=inject(HttpClient)

    postRequestRecipe(prompt:string):Observable<any>{
        const body= {
            contents: [{parts:[{text:`Eres un chef profesional. Responde brevemente la siguiente duda: ${prompt}`}]}]
        }
        return this.http.post<any>(this.apiURL,body);
    }
}
