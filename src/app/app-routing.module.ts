import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { MainComponent } from './components/main/main.component';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CreateComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'single-todo/:id', component: SingleTodoComponent },
  { path: 'delete-category', component: DeleteCategoryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
