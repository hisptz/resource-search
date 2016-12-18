import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.init()
      }
    })
  }

  ngOnInit() {
    this.init()
  }
  params;
  init(){
    this.route.params.forEach((params:Params) => {
      this.params = params;
      console.log(params);
    });
  }
}
