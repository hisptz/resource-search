import { Component, OnInit,Input } from '@angular/core';
import {HttpClientService} from "../../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {ResourceExtensionService} from "../../../services/resource-extension.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[HttpClientService,ResourceExtensionService]
})
export class DetailsComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  @Input() url:any;
  @Input() schema:any;
  @Input() config:any;
  constructor(private http:HttpClientService,private resourceExtensionService:ResourceExtensionService, private router:Router) {
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

  properties={

  }
  ngOnInit() {
    this.loading = true;
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
    });
  }
}
