import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {  MytodosService, Category } from 'src/app/services/mytodos.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// export interface Todo {
//   id?: string
//   title: string
//   description?: string
//   category: string
//   created_date: string
//   completed?: boolean
// }

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  url_img = this.service.url_for_img
  categories
  currentTodo
  message = '';
   test = ''
  //form: FormGroup

  constructor(
    private service: MytodosService,
    private route: ActivatedRoute,
    private router: Router) { }
    
    form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      category: new FormControl(),
      completed: new FormControl()
    })

    ngOnInit() {
      this.message = '';
      this.getCategories()
      this.service.get(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.currentTodo = data;
            console.log(this.currentTodo)
            this.test = this.currentTodo.category
            this.form = new FormGroup({
              title: new FormControl(this.currentTodo.title),
              description: new FormControl(this.currentTodo.description),
              category: new FormControl(this.currentTodo.category),
              completed: new FormControl(this.currentTodo.completed)
            })
          })

          
    }
  
    getTodo(id) {
      this.service.get(id)
        .subscribe(data => {
              this.currentTodo = data
        },
        error => {
          console.log(error);
        });
    }

  
    updateTodo() {

      this.service.update(this.currentTodo._id, this.form.value)
        .subscribe(
          response => {
            console.log('Done !', response);
            this.router.navigate(['/'])
          },
          error => {
            console.log(error);
          });
    }

  getCategories(){
    this.service.getAllCategories()
      .subscribe(res => {
        this.categories = res
        console.log(this.categories)
      })
  }


  

}
