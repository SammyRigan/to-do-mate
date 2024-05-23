import { Component, Input, OnInit, input } from '@angular/core';
import { IList, IToBuy } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss'],
})
export class BuyCardComponent  implements OnInit {

  @Input() toBuy?: IToBuy;

  list: IList;

  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit() {
    if (this.toBuy.listId) {
      this.getList()
    }
  }

  async update() {
    this.toBuy.status = this.toBuy.status === 'bought' ? 'not bought' : 'bought';
    this.toBuy.boughtDate = this.toBuy.status === 'bought' ? Date.now().toString() : '';
    const res = await this.generalService.updateItem('to-buys', {...this.toBuy});
    this.toBuy.id = res;
  }

  async getList() {
    const res = await this.generalService.getSingle('tobuy-lists', this.toBuy.listId);
    this.list = {
      id: res.id,
      ...res.data() as IList
    }
  }

}
