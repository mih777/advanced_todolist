import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
//import { ServiceWorkerModule } from '@angular/service-worker';
//import { environment } from '../environments/environment';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateComponent,
    UpdateComponent,
    SingleTodoComponent,
    DeleteCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
