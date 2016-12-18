import { Component, OnInit,Input } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
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
  loading;
  loadingError;
  ngOnInit() {
    this.loading = true;
    this.loadingError = false;
    let url = "";
    let objectName = "";
    console.log(this.type,this.hierarchy);
    Object.keys(this.hierarchy).some((key,index,array)=>{
      url += this.hierarchy[key];
      if (index !== array.length - 1){
        url += "/";
      }
      if(index % 2 == 0 || this.type == key){
        objectName = this.hierarchy[key].substr(0,this.hierarchy[key].length - 1);
        return true;
      }
      return false;
    })
    console.log(url);
    this.http.get("schemas/" + objectName+ ".json").subscribe((data) => {
      this.schema = data.json();
      this.http.get(url+ ".json").subscribe((data) => {
        this.resource = data.json();
        console.log("Resource",this.resource)
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
