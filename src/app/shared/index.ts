import { Component, OnInit,Input,ElementRef,ViewChild,Renderer } from '@angular/core';

export abstract class Section implements OnInit {

  @Input() type:any;
  @Input() hierarchy:any;
  url;
  objectName;
  loading;
  loadingError;
  isLast:Boolean;

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
          this.isLast = true;
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
  abstract sectionOnInit():void;
}
