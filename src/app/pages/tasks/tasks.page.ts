import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuyFormComponent } from 'src/app/components/buy-form/buy-form.component';
import { TaskFormComponent } from 'src/app/components/task-form/task-form.component';
import { ITask, IToBuy } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tasks: ITask[] = [];
  lastDoc: any;

  buys: IToBuy[] = [];
  lastBuy: any;

  isLoading = true;
  view = 'todo';

  constructor(
    private modalCtrl: ModalController,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.getBuys();
  }

  async getTasks() {
    const res = await this.generalService.getItems('tasks', this.lastDoc, [], 30);
    this.tasks = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: {
        iType: 1
      }
    });
    await modal.present();
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {
      this.tasks.unshift(data);
    }
  }

  async getBuys() {
    const res = await this.generalService.getItems('to-buys', this.lastDoc, [], 30);
    this.buys = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async addBuy() {
    const modal = await this.modalCtrl.create({
      component: BuyFormComponent,
      componentProps: {
        iType: 2
      }
    });
    await modal.present();
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {
      this.buys.unshift(data);
    }
  }

  

}
