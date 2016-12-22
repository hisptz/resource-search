import { Component, OnInit, Input } from '@angular/core';
import {ResourceExtensionService} from "../../../services/resource-extension.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  @Input() url:any;
  @Input() schema:any;
  @Input() config:any;
  constructor(private resourceExtensionService:ResourceExtensionService) { }

  data;
  loading;
  loadingError;
  ngOnInit() {
    this.loading = true;
    this.loadingError = false;

    let resourceExtension:any = this.resourceExtensionService.getResourceExt(this.schema.displayName);
    console.log(resourceExtension);
    if(resourceExtension[this.config.getData]){
      resourceExtension[this.config.getData](this.url).then((data)=>{
        this.data = data;
        console.log(this.data);
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.loadingError = error;
      })
    }else{
      this.loading = false;
      this.loadingError = "Error Loading";
    }
  }
}
