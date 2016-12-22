import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {Section} from "../../shared/index";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [HttpClientService]
})
export class ListComponent extends Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  //url;
  constructor(private http:HttpClientService, private router:Router) {
    super();
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }

  resources;
  resourceDetails;

  sectionOnInit() {
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources;
      this.resources.forEach((resource:any)=> {
        if (resource.plural == this.hierarchy[this.type]) {
          this.resourceDetails = resource;
        }
      });
      this.http.get(this.url + ".json").subscribe((data) => {
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
