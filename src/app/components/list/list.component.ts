import { Component, OnInit,Input } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[HttpClientService]
})
export class ListComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  constructor(private http:HttpClientService, private router:Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }

  resources;
  resourceDetails;
  loading;
  loadingError;
  ngOnInit() {
    this.loading = true;
    this.loadingError = false;
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources.forEach((resource:any)=>{
        if(resource.plural == this.hierarchy[this.type]){
          this.resourceDetails = resource;
        }
      })
      this.http.get(this.hierarchy[this.type]+ ".json").subscribe((data) => {
        this.resources = data.json()[this.hierarchy[this.type]];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.loadingError = error;
      });
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });

  }

}
