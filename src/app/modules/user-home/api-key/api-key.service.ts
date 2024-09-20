import { Injectable, signal } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyService {

  public state = {
    apiKey$: signal<string>(""),
    developmentKey$: signal<string>(""),
    isProductionKey$: signal<boolean>(true),
    isDevelopmentKEY$: signal<boolean>(false)
  };

  constructor(private httpService: HttpService) {
    this.getApiKey();
   }

  private getApiKey(): void {
    this.httpService.getAuthenticated(
      environment.apiUrl + "UserLogin/GetApiKey",
    ).subscribe((response: any) => {
      this.state.apiKey$.set(response.apiKey);
      this.state.developmentKey$.set(response.developmentKey);
    }, (error) => {
    });
  }
}
