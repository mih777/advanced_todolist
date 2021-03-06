import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Todo {
  id?: string
  title: string
  category: string
  description?: string
  completed?: boolean
  created_date?: string
}

export interface Category {
  id?: string
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class MytodosService {

  url_for_img: string = 'https://mih777.github.io/mytodolist'
  url: string = 'https://graph-server777.herokuapp.com'

  //url = 'http://localhost:3000'

  todos: Todo[] = []
  categories: Category[] = []

  constructor(private http: HttpClient) { }

  createCategory(category: Category)  : Observable<Category> {
    return this.http.post<Category>(`${this.url}/api/mytodos/create-category`, category)
  }

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/api/mytodos/categories`)
  }

  create(todo: Todo)  : Observable<Todo> {
    return this.http.post<Todo>(`${this.url}/api/mytodos/create`, todo)
  }

  update(id, data) : Observable<Todo>{
    return this.http.put<Todo>(`${this.url}/api/mytodos/update/todo/${id}`, data);
  }

  getAll(pagination , page) : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/api/mytodos?pagination=${pagination}&page=${page}`)
  }

  getAllNoParams() : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/api/mytodos/noparams`)
  }

  getOneById(id: string) : Observable<Todo>{
    return this.http.get<Todo>(`${this.url}/api/mytodos/${id}`)
  }

  get(id) {
    return this.http.get(`${this.url}/api/mytodos/${id}`);
  }

  getAllByCategory(category: string, pagination, page) : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/api/mytodos/cat/${category}?pagination=${pagination}&page=${page}`)
  }

  getAllByCategoryNoParams(category: string) : Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/api/mytodos/cat/${category}/noparams`)
  }

  deleteAllByCategory(category_title: string){
    return this.http.delete(`${this.url}/api/mytodos/delete-all/${category_title}`)
  }

  deleteCategory(category_id: string){
    return this.http.delete(`${this.url}/api/mytodos/delete-category/${category_id}`)
  }


  delete(id: string)  : Observable<Todo>{
    return this.http.delete<Todo>(`${this.url}/api/mytodos/delete/${id}`)
  }


}
