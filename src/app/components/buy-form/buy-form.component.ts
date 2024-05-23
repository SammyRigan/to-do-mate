import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IList, IToBuy } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss'],
})
export class BuyFormComponent  implements OnInit {

  toBuy: IToBuy = {
    id: '',
    date: '',
    boughtDate: '',
    title: '',
    status: 'not bought'
  }

  lists: IList[] = [];

  actioned = false;

  date = Date.now();
  isLoading = true;

  dater;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.dater = setInterval(() => {
      this.date = Date.now();
    }, 1000);
    this.getLists();
  }

  async getLists() {
    const res = await this.generalService.getItems('tobuy-lists', null, [], 30);
    this.lists = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
    this.isLoading = false;
  }

  async save() {
    if (!this.toBuy.title.trim()) {
      return;
    }
    clearInterval(this.dater);
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.toBuy.date = Date.now().toString();
    const res = await this.generalService.addItem('to-buys', this.toBuy);
    this.toBuy.id = res.id;

    // IN THE FUTURE, USE A CLOUD FUNCTION FOR THIS
    if (this.toBuy.listId) {
      const selectedList = this.lists.find(i => i.id === this.toBuy.listId);
      selectedList.itemsNum = selectedList.itemsNum + 1;
      if (this.toBuy.amount) {
        selectedList.totalAmount = (selectedList.totalAmount ? selectedList.totalAmount : 0) + this.toBuy.amount;
      }
      await this.generalService.updateItem('tobuy-lists', {...selectedList});
    }
    
    this.modalCtrl.dismiss(this.toBuy);
    this.loadingCtrl.dismiss();
  }

  async update() {
    if (!this.toBuy.title.trim()) {
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    
    const res = await this.generalService.updateItem('to-buys', {...this.toBuy});
    this.toBuy.id = res;
    this.close();
    this.loadingCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
