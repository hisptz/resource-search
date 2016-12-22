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
  url;
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
    this.url = "";
    Object.keys(this.hierarchy).some((key,index,array)=>{
      this.url += this.hierarchy[key];
      if (index !== array.length - 1){
        this.url += "/";
      }
      /*if(index % 2 == 0){
        objectName = this.hierarchy[key].substr(0,this.hierarchy[key].length - 1);
      }*/
      if( this.type == key){
        return true;
      }
      return false;
    });
    if(this.url.endsWith("/")){
      this.url = this.url.substr(0,this.url.length - 1);
    }
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources.forEach((resource:any)=>{
        if(resource.plural == this.hierarchy[this.type]){
          this.resourceDetails = resource;
        }
      })
      this.http.get(this.url+ ".json").subscribe((data) => {
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
