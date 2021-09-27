import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public taskName: string;
  public dueDate: Date;
  public countDownInterval;
  public editIndex;
  public editing: boolean = false;
  public todos: any = [];
  public showError: boolean = false;
  public errorMessage: string;
  public todaysDate = new Date();
  public selectedTodo = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: new Date(),
    name: ''
  }
  public showTimer: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  addTaskToList() {
    if (this.taskName) {
      this.showError = false;
      if (this.dueDate) {
        const todaysDate = new Date();
        const dueDate = new Date(this.dueDate);
        if (dueDate > todaysDate) {
          this.showError = false;
          const todoObj = {
            name: this.taskName,
            date: this.dueDate
          }
          if (this.editing) {
            this.todos[this.editIndex] = { ...this.todos[this.editIndex], ...todoObj };
            this.editing = false;
          } else {
            this.todos.push(todoObj);
          }
          this.taskName = '';
          this.dueDate = null;
          console.log(this.todos)
        } else {
          this.showError = true;
          this.errorMessage = "Due date can not be past date."
        }
      } else {
        this.showError = true;
        this.errorMessage = "Please enter the due date."
      }
    } else {
      this.showError = true;
      this.errorMessage = "Please enter the task name."
    }
  }

  setCountDownValue(todoObj) {
    const diffTime = new Date(todoObj.date).getTime() - new Date().getTime();
    console.log(diffTime);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
    this.selectedTodo = {
      ...this.selectedTodo,
      days,
      hours,
      minutes,
      seconds
    }
  }

  selectTodo(todo, index) {
    clearInterval(this.countDownInterval);
    this.selectedTodo = todo;
    this.selectedTodo['index'] = index;
    if (!todo.completed) {
        this.countDownInterval = setInterval(() => {
          this.showTimer = true;
          this.setCountDownValue(this.selectedTodo)
        }, 1000);
    }
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    if (this.selectedTodo && this.selectedTodo['index'] === index) {
      // this.showTimer = false;
      this.resetCounter()
      clearInterval(this.countDownInterval);
    }
  }

  completeTodo(index) {
    event.preventDefault();
    this.todos[index]['completed'] = true;
    if (this.selectedTodo && this.selectedTodo['index'] === index) {
      // this.showTimer = false;
      clearInterval(this.countDownInterval);
      this.resetCounter();
    }
  }

  resetCounter() {
    this.selectedTodo = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      name:'',
      date: new Date(),
    }
  }

  editTodo(todo, index) {
    this.taskName = todo.name;
    this.dueDate = todo.date;
    this.editIndex = index;
    this.editing = true;
  }


}
