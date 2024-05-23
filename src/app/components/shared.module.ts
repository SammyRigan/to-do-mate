import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TaskCardComponent } from "./task-card/task-card.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { FormsModule } from "@angular/forms";
import { BuyCardComponent } from "./buy-card/buy-card.component";
import { BuyFormComponent } from "./buy-form/buy-form.component";
import { ListFormComponent } from "./list-form/list-form.component";
import { ListCardComponent } from "./list-card/list-card.component";

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [
        TaskCardComponent,
        TaskFormComponent,
        BuyCardComponent,
        BuyFormComponent,
        ListFormComponent,
        ListCardComponent
    ],
    exports: [
        TaskCardComponent,
        TaskFormComponent,
        BuyCardComponent,
        BuyFormComponent,
        ListFormComponent,
        ListCardComponent
    ]
})
export class SharedModule {}