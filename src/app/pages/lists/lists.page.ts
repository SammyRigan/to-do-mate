import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListFormComponent } from 'src/app/components/list-form/list-form.component';
import { IList } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  view = 'todo';
  taskLists: IList[] = [];
  buyLists: IList[] = [];
  lastDoc: any;
  lastBuyDoc: any;
  isLoading = true;

  constructor(
    private location: Location,
    private generalService: GeneralService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getTasksLists();
    this.getBuyLists();
  }

  goBack() {
    this.location.back();
  }

  async getTasksLists() {
    const res = await this.generalService.getItems('todo-lists', this.lastDoc, [], 30);
    this.taskLists = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async getBuyLists() {
    const res = await this.generalService.getItems('tobuy-lists', this.lastDoc, [], 30);
    this.buyLists = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async addList() {
    const modal = await this.modalCtrl.create({
      component: ListFormComponent,
      componentProps: {
        iType: this.view
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {
      this.view === 'todo' ? this.taskLists.unshift(data) : this.buyLists.unshift(data);
    }
  }

}
