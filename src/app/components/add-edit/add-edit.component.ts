import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {ResourceExtensionService} from "../../services/resource-extension.service";
import {Section} from "../../shared/index";

@Component({
  selector: 'add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
  providers: [HttpClientService, ResourceExtensionService]
})
export class AddEditComponent extends Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  @Input() config:any;

  constructor(private http:HttpClientService, private resourceExtensionService:ResourceExtensionService, private router:Router, protected route:ActivatedRoute) {
    super(route);
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

  properties = {}
  action = "";

  sectionOnInit() {
    this.http.get("schemas/" + this.objectName + ".json").subscribe((data) => {
      this.schema = data.json();
      this.resourceExtension = this.resourceExtensionService.getResourceExt(this.schema.displayName);
      this.route
        .queryParams
        .subscribe(params => {

          if (params['action'] == 'add') {
            this.action = "add";
            this.resource = {};
            this.schema.properties.forEach((property:any) => {
              if (property.relativeApiEndpoint && property.required) {
                this.addEndPoint(property);
              }
            })
            this.loading = false;
          } else if (params['action'] == 'edit') {
            this.action = "edit";
            this.http.get(this.url + ".json").subscribe((data) => {
              this.resource = data.json();
              this.loading = false;
            }, (error) => {
              this.loading = false;
              this.loadingError = error;
            });
          }
        });
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });

  }

  relativeApiEndpoint = {}

  addEndPoint(property) {
    if (this.action = "add")
      this.resource[property.name] = {id: ""};
    this.http.get(property.relativeApiEndpoint.replace("/", "") + ".json").subscribe((data) => {
      this.relativeApiEndpoint[property.relativeApiEndpoint] = data.json()[property.relativeApiEndpoint.replace("/", "")];
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }

  savingError:any;

  save() {
    this.savingError = null;
    if (this.action =="add") {
      this.add();
    } else if (this.action == "edit") {
      this.update();
    }

    return false;
  }

  add() {
    this.http.post(this.url + ".json", this.resource).subscribe((data) => {
      let results = data.json();
      if (results.response.status == "SUCCESS") {
        if (results.response.importConflicts) {
          this.savingError = {
            type: 'warning',
            message: "" + results.response.importConflicts
          };
        } else {
          this.router.navigateByUrl(this.url + "/" + results.response.lastImported);
        }
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.savingError = {
        type: 'danger',
        message: "" + error.response.importConflicts
      };
    });
  }

  update() {
    this.http.put(this.url + ".json", this.resource).subscribe((data) => {
      let results = data.json();
      if (results.response.status == "SUCCESS") {
        if (results.response.importConflicts) {
          this.savingError = {
            type: 'warning',
            message: "" + results.response.importConflicts
          };
        } else {
          this.router.navigateByUrl(this.url);
        }
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.savingError = {
        type: 'danger',
        message: "" + error.response.importConflicts
      };
    });
  }
  setIsLast(){
    this.isLast = true;
  }
}
