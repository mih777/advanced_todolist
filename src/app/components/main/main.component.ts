import { Component, OnInit } from '@angular/core';
import { MytodosService, Todo, Category } from '../../services/mytodos.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  togle = false

  todos: Todo[] = []
  categories: Category[] = []

  static pagination = 5
  page = 1
  qwantity
  static catName = 'all'

  constructor(
    private service: MytodosService,
    private router: Router
  ) { }

  get staticVar(){
    return MainComponent.catName
  }

  ngOnInit(): void {
    this.getCategories()
    this.getItemsQwantity()
    //console.log(MainComponent.catName)
  }

  inpSelect(event){
    if(event.target.value === 'DELETE CATEGORY'){
      this.router.navigate(['/delete-category'])
    }
    MainComponent.catName = event.target.value
    this.getContent()
    this.getItemsQwantity()
    console.log(MainComponent.catName)
  }

  

  getAll() {
    this.service.getAll(MainComponent.pagination, this.page)
      .subscribe(res => {
        this.todos = res
      })
  }

  

  fetchTodosByCategory(catName: string) {
    
    this.service.getAllByCategory(catName, MainComponent.pagination, this.page)
      .subscribe(result => {
        this.todos = result
      })
  }

  getItemsQwantity(){
    if(MainComponent.catName !== 'all'){
      this.service.getAllByCategoryNoParams(MainComponent.catName)
        .subscribe(res => {
          this.qwantity = res.length
          this.getContent()
          console.log('getItemsQwantity()', MainComponent.catName)
        })
    }

    if(MainComponent.catName == 'all'){
      this.service.getAllNoParams()
        .subscribe(res => {
          this.qwantity = res.length
          this.getContent()
          console.log('getAllNoParams()',MainComponent.catName)
        })
    }
  }

  //==================================================

  qwant(event){
    MainComponent.pagination = event.target.value
    this.getContent()
  }

  decreese(){
    this.page -=1
    this.getContent()
  }

  increese(){
    this.page +=1
    this.getContent()
  }


  getCategories(){
    this.service.getAllCategories()
      .subscribe(res => {
        this.categories = res
      })
  }


  delete(id: string): void{
    this.service.delete(id)
      .subscribe(() => {
        this.getContent()
      }) 
    
  }


  getContent(){
    MainComponent.catName == 'all' ? this.getAll() : this.fetchTodosByCategory(MainComponent.catName)
  }

}
