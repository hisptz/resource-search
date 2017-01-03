import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {HttpClientService} from "./services/http-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClientService]
})
export class AppComponent implements OnInit {
  title = 'Resource Browser';

  constructor(private http:HttpClientService) {

  }
  ngOnInit(){
  }
}
