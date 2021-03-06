import { Component, OnInit } from '@angular/core';
import { MytodosService } from 'src/app/services/mytodos.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  form: FormGroup
  categories
  url_img = this.service.url_for_img

  constructor(
    private service: MytodosService
  ) { }

  ngOnInit(): void {
    this.getCategories()
    
  }

  getCategories(){
    this.service.getAllCategories()
      .subscribe(res => {
        this.categories = res
      })
  }

  deleteCategory(category_id, category_title){
    this.service.deleteAllByCategory(category_title)
      .subscribe(() => {})

    this.service.deleteCategory(category_id)
      .subscribe(() => {
        console.log('Category completly remove !')
        this.getCategories()
      })  
  }



}
