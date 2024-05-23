import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { IList } from 'src/app/models/models';
import { ListFormComponent } from '../list-form/list-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent  implements OnInit {

  @Input() list?: IList;
  @Input() view?: string;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  async more() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Edit',
          handler: () => this.editList()
        },
        {
          text: 'View',
          handler: () => this.router.navigateByUrl(`/lists/single-list/${this.view}/${this.list.id}`),
        },
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      mode: 'ios',
      cssClass: 'more'
    });

    await actionSheet.present();
  }

  async editList() {
    const modal = await this.modalCtrl.create({
      component: ListFormComponent,
      componentProps: {
        iType: this.view,
        list: {...this.list}
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data) {
      this.list = {id: this.list.id, ...data};
    }
  }

}
