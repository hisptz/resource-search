import { Component,OnInit } from '@angular/core';
import {HttpClientService} from "./services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HttpClientService]
})
export class AppComponent implements OnInit {
  title = 'Resource Browser';

  isLast;
  constructor(private http:HttpClientService,private route:ActivatedRoute, private router:Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.isLast = (val.url == "/");
        this.init()
      }
    })
  }
  resources;
  loading;
  loadingError;
  ngOnInit(){
    this.init();
  }
  params = {

  };
  init(){
    this.loading = true;
    this.loadingError = false;
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources;
      this.route.params.forEach((params:Params) => {
        this.params = params;
      });
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }
}
