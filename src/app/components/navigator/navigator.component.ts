import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';
import { ContextMenuService, ContextMenuComponent } from 'angular2-contextmenu';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  providers:[HttpClientService]
})
export class NavigatorComponent implements OnInit {

  isLast;
  constructor(private contextMenuService: ContextMenuService,private http:HttpClientService,private route:ActivatedRoute, private router:Router) {
    this.setContextMenuAction([
      {
        title : "View Driver",
        url : "drivers/:id/view"
      },
      {
        title : "Edit Driver",
        url : "drivers/:id/update"
      },
      {
        title : "View Licence History",
        url : "drivers/:id/licences"
      },
      {
        title : "Add Licence History",
        url : "drivers/:id/licences/add"
      },
      {
        title : "View Accidents",
        url : "drivers/:id/accidents"
      },
      {
        title : "View Offences",
        url : "drivers/:id/offences"
      }
    ]);
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.init()
      }
    })
  }
  resources;
  loading;
  loadingError;
  ngOnInit(){
    this.init();
  }
  params = {

  };
  queryParams = {

  };
  init(){
    this.route
      .queryParams
      .subscribe(params => {
        this.queryParams = params;
        console.log("App Params:",params);
      });
    this.route.params.forEach((params:Params) => {
      this.params = params;
      this.isLast = (Object.keys(params).length == 0);
    });
    this.loading = true;
    this.loadingError = false;
    this.http.get("resources.json").subscribe((data) => {
      this.resources = data.json().resources;

      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.loadingError = error;
    });
  }

  private contextMenuOptions : any;
  onRowClick(event){
    if(this.contextMenuOptions.length > 0){
      this.contextMenuOptions[0].click(event);
    }
  }
  /**
   * method to set context menu, menuActions is array of object with two attribute title and url
   * @param menuActions
   */
  //todo remain handling for all url conversion
  private setContextMenuAction(menuActions){
    this.contextMenuOptions = [];
    menuActions.forEach((menuAction :any)=>{
      this.contextMenuOptions.push({
        html : ()=> menuAction.title,
        click : (event)=>{
          let url = menuAction.url.replace(':id',event.event);
          this.router.navigate([url]);
        }
      });
    })
  }


  /**
   * note item id object on the row
   * @param $event
   * @param item
   */
  public onContextMenu($event: MouseEvent, resource: any): void {
    this.contextMenuService.show.next({
      actions: this.contextMenuOptions,
      event: $event,
      item: resource,
    });
    $event.preventDefault();
    $event.stopPropagation();
  }
}
