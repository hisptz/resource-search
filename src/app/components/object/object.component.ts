import { Component, OnInit,Input,ElementRef,ViewChild,Renderer } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import {ResourceExtensionService} from "../../services/resource-extension.service";

@Component({
  selector: 'object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
  providers:[HttpClientService,ResourceExtensionService]
})
export class ObjectComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  constructor(private http:HttpClientService,private resourceExtensionService:ResourceExtensionService,private renderer:Renderer) {

  }

  schema;
  resource;
  resourceExtension;
  loading;
  loadingError;
  url;

  @ViewChild('header') header:ElementRef;
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

    this.http.get("schemas/" + objectName+ ".json").subscribe((data) => {
      this.schema = data.json();
      this.resourceExtension = this.resourceExtensionService.getResourceExt(this.schema.displayName);
      this.loading = false;
      let event = new MouseEvent('click', {bubbles: true});
      this.renderer.invokeElementMethod(
        this.header.nativeElement, 'dispatchEvent', [event]);
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }

}
