import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { environment } from "src/environments/environment";
import { ApiKeyService } from "./api-key.service";

@Component({
  selector: "app-api-key",
  templateUrl: "./api-key.component.html",
  styleUrls: ["./api-key.component.css"],
  providers: [ApiKeyService]
})
export class ApiKeyComponent implements OnInit {

  constructor(
    public apiKeyService: ApiKeyService
  ) {}

  ngOnInit(): void {
  }

  public formCheckChanged(event: any) {
    this.apiKeyService.state.isProductionKey$.set(!this.apiKeyService.state.isProductionKey$());
    this.apiKeyService.state.isDevelopmentKEY$.set(!this.apiKeyService.state.isDevelopmentKEY$());
  }
}