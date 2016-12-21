import { Component,OnInit } from '@angular/core';
import {HttpClientService} from "./services/http-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HttpClientService]
})
export class AppComponent implements OnInit {
  title = 'Resource Browser';
  
  constructor(private http:HttpClientService){

  }
  resources;
  loading;
  loadingError;
  ngOnInit(){
    this.loading = true;
    this.loadingError = false;
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }
}
