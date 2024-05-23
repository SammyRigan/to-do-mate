import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IList, ITask, IToBuy } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent  implements OnInit {

  task: ITask = {
    id: '',
    date: '',
    completedDate: '',
    title: '',
    status: 'not done'
  }

  lists: IList[] = [];

  priorityLevels = ['Low', 'Medium', 'High'];

  actioned = false;

  date = Date.now();
  isLoading = true;
  dater;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.dater = setInterval(() => {
      this.date = Date.now();
    }, 1000);
    this.getLists();
  }

  async getLists() {
    const res = await this.generalService.getItems('todo-lists', null, [], 30);
    this.lists = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async save() {
    if (!this.task.title.trim()) {
      return;
    }
    clearInterval(this.dater);
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.task.date = Date.now().toString();
    const res = await this.generalService.addItem('tasks', this.task);
    this.task.id = res.id;

    // IN THE FUTURE, USE A CLOUD FUNCTION FOR THIS
    if (this.task.listId) {
      const selectedList = this.lists.find(i => i.id === this.task.listId);
      selectedList.itemsNum = selectedList.itemsNum + 1;
      await this.generalService.updateItem('todo-lists', {...selectedList});
    }

    this.modalCtrl.dismiss(this.task);
    this.loadingCtrl.dismiss();
  }

  // UPDATE THIS FUNCTION WITH THE CHECK FOR IF TASK LIST WAS CHANGED SO YOU CAN CHANGE "itemsNum"
  async update() {
    if (!this.task.title.trim()) {
      return;
    }
    clearInterval(this.dater);
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const res = await this.generalService.updateItem('tasks', {...this.task});
    this.task.id = res;
    this.close();
    this.loadingCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
