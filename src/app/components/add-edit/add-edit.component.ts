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
            this.schema.properties.forEach((property:any) =>{
              if(property.relativeApiEndpoint && property.required){
                this.addEndPoint(property);
              }
            })
            this.loading = false;
          }else if(params['action'] == 'edit'){
            this.http.get(this.url + ".json").subscribe((data) => {
              this.resource = data.json();
              /*if(this.config.properties){
                this.schema.properties.forEach((property)=>{
                  if(this.resourceExtension[this.config.properties.transform[property.name]]){
                    this.resourceExtension[this.config.properties.transform[property.name]](this.resource[property.name]).then((result)=>{
                      this.properties[property.name] = result;
                    })
                  }
                })
              }*/
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

  }

  relativeApiEndpoint={

  }
  addEndPoint(property){
    this.resource[property.name] = {id:""};
    this.http.get(property.relativeApiEndpoint.replace("/","") + ".json").subscribe((data) => {
      this.relativeApiEndpoint[property.relativeApiEndpoint] = data.json()[property.relativeApiEndpoint.replace("/","")];
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }
  savingError:any;
  save(){
    this.savingError = null;
    this.http.post(this.url + ".json",this.resource).subscribe((data) => {
      console.log(data.json());
      let results = data.json();
      if(results.response.status == "SUCCESS"){
        if(results.response.importConflicts){
          this.savingError = {
            type:'warning',
            message:"" + results.response.importConflicts
          };
        }else{
          this.router.navigateByUrl(this.url + "/" + results.response.lastImported);
        }
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.savingError = {
        type:'danger',
        message:"" + error.response.importConflicts
      };
    });
    return false;
  }
}
