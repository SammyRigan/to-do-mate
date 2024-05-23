import { Component, Input, OnInit } from '@angular/core';
import { IList, ITask } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent  implements OnInit {

  @Input() task?: ITask;

  list: IList;

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    if (this.task.listId) {
      this.getList()
    }
  }

  async update() {
    this.task.status = this.task.status === 'completed' ? 'not completed' : 'completed';
    this.task.completedDate = this.task.status === 'completed' ? Date.now().toString() : '';
    const res = await this.generalService.updateItem('tasks', {...this.task});
    this.task.id = res;
  }

  async getList() {
    const res = await this.generalService.getSingle('todo-lists', this.task.listId);
    this.list = {
      id: res.id,
      ...res.data() as IList
    }
  }


}
