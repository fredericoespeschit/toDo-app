import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo [] = [];
  public title: String= "Minhas tarefas";
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      task: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.load();
  }

  add(){
    const task = this.form.controls['task'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, task, false))
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();

  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();

  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();

  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(){
    const datao = localStorage.getItem('todos');
    if(datao !== null) {
      this.todos = JSON.parse(datao);
    }

  }
  changeMode(mode: String) {
    this.mode = mode;
  }
}
