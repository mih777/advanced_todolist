import { Component, OnInit } from '@angular/core';
import { MytodosService, Todo, Category } from '../../services/mytodos.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading: boolean = false

  todos: Todo[] = []
  categories: Category[] = []

  static pagination = 10
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
      console.log(event.target.value)
    }
    MainComponent.catName = event.target.value
    this.getContent()
    this.getItemsQwantity()
    console.log(event.target.value)
  }

  

  getAll() {
    this.loading = true
    this.service.getAll(MainComponent.pagination, this.page)
      .subscribe(res => {
        this.loading = false
        this.todos = res
      })
  }

  

  fetchTodosByCategory(catName: string) {
    this.loading = true
    this.service.getAllByCategory(catName, MainComponent.pagination, this.page)
      .subscribe(result => {
        this.loading = false
        this.todos = result
      })
  }

  getItemsQwantity(){
    if(MainComponent.catName !== 'all'){
      this.service.getAllByCategoryNoParams(MainComponent.catName)
        .subscribe(res => {
          this.qwantity = res.length
          this.getContent()
          
        })
    }

    if(MainComponent.catName == 'all'){
      this.service.getAllNoParams()
        .subscribe(res => {
          this.qwantity = res.length
          this.getContent()
          
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
    if(this.page == 0){
      this.page = 1
      this.getContent()
    }else{
      this.getContent()
    }
    
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
    let isConfirm = confirm("Действительно удалить ?");
    if(isConfirm){
      this.service.delete(id)
      .subscribe(() => {
        this.getContent()
      })
    } 
    
  }


  getContent(){
    MainComponent.catName == 'all' ? this.getAll() : this.fetchTodosByCategory(MainComponent.catName)
  }

}