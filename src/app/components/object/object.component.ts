import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {ResourceExtension} from '../../extensions/resource-extension';
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[HttpClientService]
})
export class ObjectComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  constructor(private http:HttpClientService, private router:Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.ngOnInit()
      }
    })
  }

  schema;
  resource;
  resourceExtension;
  loading;
  loadingError;
  url;
  ngOnInit() {
    this.loading = true;
    this.loadingError = false;
    this.url = "";
    let objectName = "";
    Object.keys(this.hierarchy).some((key,index,array)=>{
      this.url += this.hierarchy[key];
      if (index !== array.length - 1){
        this.url += "/";
      }
      if(index % 2 == 0){
        objectName = this.hierarchy[key].substr(0,this.hierarchy[key].length - 1);
      }
      if( this.type == key){
        return true;
      }
      return false;
    })
    //console.log(new extensions["ResourceExtension"]());
    let resourceExtension = new ResourceExtension();

    this.http.get("schemas/" + objectName+ ".json").subscribe((data) => {
      this.schema = data.json();
      this.resourceExtension = resourceExtension.getResourceExt(objectName);
      this.http.get(this.url + ".json").subscribe((data) => {
        this.resource = data.json();
        this.loading = false;
        console.log("Yeey:",this.loading);
      }, (error) => {
        this.loading = false;
        this.loadingError = error;
      });
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }
  select(tab){
    console.log(tab);
  }

}
