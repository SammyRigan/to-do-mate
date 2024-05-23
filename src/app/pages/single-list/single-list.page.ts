import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IList, ITask, IToBuy } from 'src/app/models/models';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.page.html',
  styleUrls: ['./single-list.page.scss'],
})
export class SingleListPage implements OnInit {

  view: string;
  listId: string;
  list: IList;
  items: any[] = [];
  lastDoc: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private generalService: GeneralService
  ) { }

  async ngOnInit() {
    const routParams = this.activatedRoute.snapshot.params;
    this.view = routParams['view'];
    this.listId = routParams['id'];
    this.getList();
    this.getItems();
  }

  goBack() {
    this.location.back();
  }

  async getList() {
    const res = await this.generalService.getSingle(`${this.view}-lists`, this.listId);
    this.list = {
      id: this.listId,
      ...res.data() as IList
    }
  }

  async getItems() {
    const res = await this.generalService.getItems(`${this.view === 'todo' ? 'tasks' : 'to-buys' }`, this.lastDoc, [{key: 'listId', value: this.listId}], 30);
    this.items = res.docs.map(e => ({
      id: e.id,
      ...e.data() as any
    }));
  }

}
