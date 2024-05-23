import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IList } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent  implements OnInit {

  @Input() list: IList;
  @Input() iType: string;

  recurringPeriods = [
    'daily',
    'weekly',
    'monthly',
    'yearly'
  ];
  
  actioned = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    if (!this.list) {
      this.list = {
        id: '',
        date: '',
        title: '',
        itemsNum: 0,
        recurring: false
      }
    }
  }
  
  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    if (!this.list.title) {
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.list.date = Date.now().toString();
    const res = this.list.id ? await this.generalService.updateItem(`${this.iType}-lists`, {...this.list}) : await this.generalService.addItem(`${this.iType}-lists`, this.list);
    this.list.id = res.id;
    this.modalCtrl.dismiss(this.list);
    this.loadingCtrl.dismiss();
  }
}
