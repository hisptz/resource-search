import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {ResourceExtensionService} from "../../services/resource-extension.service";
import {Section} from "../../shared/index";

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
  providers:[HttpClientService,ResourceExtensionService]
})
export class ObjectComponent extends Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;

  constructor(private http:HttpClientService,private resourceExtensionService:ResourceExtensionService, protected route:ActivatedRoute) {
    super(route);
  }

  schema;
  resource;
  resourceExtension;
  loading;
  loadingError;

  sectionOnInit(){
    this.http.get("schemas/" + this.objectName+ ".json").subscribe((data) => {
      this.schema = data.json();
      this.resourceExtension = this.resourceExtensionService.getResourceExt(this.schema.displayName);
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }
}
