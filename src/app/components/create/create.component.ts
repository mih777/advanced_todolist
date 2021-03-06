import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MytodosService, Todo, Category } from 'src/app/services/mytodos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  url_img = this.service.url_for_img

  form: FormGroup
  category_form: FormGroup
  category: Category[] = []
  todo: Todo[] = []

  categories: Category[] = []

  constructor(
    private service: MytodosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories()
    this.form = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      completed: new FormControl('')
    })

    this.category_form = new FormGroup({
      title: new FormControl('')
    })
  }
  //getCategories
  getCategories(){
    this.service.getAllCategories()
      .subscribe(res => {
        this.categories = res
      })
  }
  // addCategory
  addCategory(){
    const formData = { ...this.category_form.value }

    this.service.createCategory({
      title: formData.title
    }).subscribe(category => {
      this.category.push(category)
      console.log(this.category)
      this.ngOnInit()
      this.category_form.reset()
    })
  }

  submit() {
    const formData = { ...this.form.value }

    this.service.create({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      //completed: false
    }).subscribe(todo => {
      this.todo.push(todo)
      this.router.navigate(['/'])
    })

  }



}
