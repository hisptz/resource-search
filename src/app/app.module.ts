import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import {Ng2PaginationModule} from 'ng2-pagination';

import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule,Routes }   from '@angular/router';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { Dhis2MenuComponent } from './components/dhis2-menu/dhis2-menu.component';
import { ValuesPipe } from './pipes/values.pipe';
import { ListComponent } from './components/list/list.component';
import { ObjectComponent } from './components/object/object.component';
import { SearchPipe } from './pipes/search.pipe';

import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DetailsComponent } from './components/object-tabs/details/details.component';
import { ChartsComponent } from './components/object-tabs/charts/charts.component';

import { Ng2HighchartsModule } from 'ng2-highcharts';
import { Ng2DhisVisualizerComponent } from './components/object-tabs/charts/ng2-dhis-visulizer.component';
import { TransormFieldToNamePipe } from './pipes/transorm-field-to-name.pipe';
import { ContextMenuModule } from 'angular2-contextmenu';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { Dhis2VisualizerComponent } from './components/dhis2-visualizer/dhis2-visualizer.component';
import { ResourcePipePipe } from './pipes/resource-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavigatorComponent,
    Dhis2MenuComponent,
    ValuesPipe,
    ListComponent,
    ObjectComponent,
    SearchPipe,
    DetailsComponent,
    ChartsComponent,
    Ng2DhisVisualizerComponent,
    TransormFieldToNamePipe,
    AddEditComponent,
    Dhis2VisualizerComponent,
    ResourcePipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TabsModule,
    Ng2HighchartsModule,
    ContextMenuModule,
    RouterModule.forRoot(<Routes>[
      { path: '', component:NavigatorComponent},
      {path: ':objects', component:NavigatorComponent},
      {path: ':objects/:objectId', component:NavigatorComponent},
      {path: ':objects/:objectId/:relationObjects', component:NavigatorComponent},
      {path: ':objects/:objectId/:relationObjects/:relationObjectId', component:NavigatorComponent},
    ]),
    HttpModule,
    Ng2PaginationModule,
    AccordionModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
