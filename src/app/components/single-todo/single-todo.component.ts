import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MytodosService } from 'src/app/services/mytodos.service';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.scss']
})
export class SingleTodoComponent implements OnInit {

  url_img = this.todoService.url_for_img
  todo: any = {}

  constructor(
    private route: ActivatedRoute,
    private todoService: MytodosService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.todoService.getOneById(params.id)
        .subscribe((res) => {
          this.todo = res
        })
    })
  }

}
