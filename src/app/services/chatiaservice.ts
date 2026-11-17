import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IngredientAvailableByFamilyDTO } from '../models/IngredientAvailableByFamilyDTO';
import { RecommendationDTO } from '../models/RecommendationDTO';

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

    postRecommendations(items: IngredientAvailableByFamilyDTO[]): Observable<RecommendationDTO[]> {
    const lista = items
      .map(i => `- ${i.nomIngredient}: ${i.amountAvailable} disponibles`)
      .join('\n');

    const body = {
      systemInstruction: {
        parts: [{
          text: 'Eres un chef profesional peruano. Recomiendas platillos que se puedan cocinar con los ingredientes disponibles. ' +
                'La compatibilidad (0 a 100) es el porcentaje de ingredientes del platillo que el usuario ya tiene. ' +
                'Ordena la lista de mayor a menor compatibilidad y devuelve máximo 5 platillos.'
        }]
      },
      contents: [{
        parts: [{ text: `Ingredientes disponibles:\n${lista}` }]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              dish:               { type: 'STRING' },
              compatibility:      { type: 'NUMBER' },
              ingredientsUsed:    { type: 'ARRAY', items: { type: 'STRING' } },
              missingIngredients: { type: 'ARRAY', items: { type: 'STRING' } }
            },
            required: ['dish', 'compatibility', 'ingredientsUsed', 'missingIngredients']
          }
        }
      }
    };

    return this.http.post<any>(this.apiURL, body).pipe(
      map(res => {
        const text = res.candidates[0].content.parts[0].text;
        const lista: RecommendationDTO[] = JSON.parse(text);
        // por seguridad, se ordena también en el cliente
        return lista.sort((a, b) => b.compatibility - a.compatibility);
      })
    );
  }
}