import { Component, OnInit,Input,ElementRef,ViewChild,Renderer } from '@angular/core';

import { ActivatedRoute,Params,Router,NavigationStart } from '@angular/router';

export abstract class Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  url;
  objectName;
  loading;
  loadingError;
  isLast:Boolean;
  constructor(protected route:ActivatedRoute){

  }

  ngOnInit():void {
    this.loading = true;
    this.loadingError = false;
    this.objectName = "";
    this.url = "";
    this.isLast = false;
    Object.keys(this.hierarchy).some((key,index,array)=>{
      this.url += "/" + this.hierarchy[key];
      if(index % 2 == 0){
        this.objectName = this.hierarchy[key].substr(0,this.hierarchy[key].length - 1);
      }
      if( this.type == key){
        if(array.length - 1 == index){
          this.setIsLast()
        }
        return true;
      }
      return false;
    })
    if(this.url.endsWith("/")){
      this.url = this.url.substr(0,this.url.length - 1);
    }
    this.sectionOnInit();
  }
  subscription;
  setIsLast(){
    this.isLast = false;
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        if(!params['action']){
          this.isLast = true;
        }
      })
  }
  abstract sectionOnInit():void;
}
