import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {ResourceExtensionService} from "../../services/resource-extension.service";
import {Section} from "../../shared/index";

@Component({
  selector: 'add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
  providers:[HttpClientService,ResourceExtensionService]
})
export class AddEditComponent extends Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  @Input() config:any;
  constructor(private http:HttpClientService,private resourceExtensionService:ResourceExtensionService, private router:Router,private route:ActivatedRoute) {
    super();
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }

  resource;
  loading;
  loadingError;
  resourceExtension;
  schema:any;

  properties={

  }
  sectionOnInit() {
    this.http.get("schemas/" + this.objectName+ ".json").subscribe((data) => {
      this.schema = data.json();
      this.resourceExtension = this.resourceExtensionService.getResourceExt(this.schema.displayName);
      this.route
        .queryParams
        .subscribe(params => {
          if(params['action'] == 'add'){
            this.resource = {};
            this.loading = false;
          }else{
            this.http.get(this.url + ".json").subscribe((data) => {
              this.resource = data.json();
              if(this.config.properties){
                this.schema.properties.forEach((property)=>{
                  if(this.resourceExtension[this.config.properties.transform[property.name]]){
                    this.resourceExtension[this.config.properties.transform[property.name]](this.resource[property.name]).then((result)=>{
                      this.properties[property.name] = result;
                    })
                  }
                })
              }
              this.loading = false;
            }, (error) => {
              this.loading = false;
              this.loadingError = error;
            });
          }
          console.log("App Params:",params);
        });
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
    /*this.loading = true;
    this.loadingError = false;
    //let resourceExtension = new ResourceExtension();
    this.resourceExtension = this.resourceExtensionService.getResourceExt(this.schema.displayName);

    this.http.get(this.url + ".json").subscribe((data) => {
      this.resource = data.json();
      if(this.config.properties){
        this.schema.properties.forEach((property)=>{
          if(this.resourceExtension[this.config.properties.transform[property.name]]){
            this.resourceExtension[this.config.properties.transform[property.name]](this.resource[property.name]).then((result)=>{
              this.properties[property.name] = result;
            })
          }
        })
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });*/
  }

}
