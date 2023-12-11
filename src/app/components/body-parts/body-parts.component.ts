import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/core/';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observer } from 'rxjs';
import { BodyPartsService } from 'src/app/services/body_parts/body-parts.service';

type BodyPart = {
  id: number | null | undefined;
  part_name: string | null;
};

@Component({
  selector: 'app-body-parts',
  templateUrl: './body-parts.component.html',
  styleUrls: ['./body-parts.component.scss'],
})
export class BodyPartsComponent implements OnInit {
  bodyParts: BodyPart[] = [];
  bodyPartForm!: FormGroup;
  bodyPart: BodyPart = { id: null, part_name: null };
  isEdit: boolean = false;

  constructor(private readonly dialogs: TuiDialogService, private bps: BodyPartsService) {}

  add(content: PolymorpheusContent<TuiDialogContext>): void {
    this.isEdit = false;
    this.dialogs
      .open(content, {
        closeable: true,
        dismissible: false,
        label: 'Новая часть тела',
      })
      .subscribe();
  }

  ngOnInit(): void {
    this.loadData();

    this.bodyPartForm = new FormGroup({
      id: new FormControl(this.bodyPart.id),
      part_name: new FormControl(this.bodyPart.part_name, Validators.required),
    });
  }

  addClient(observer: any) {
    this.bps
      .createBodyPart(this.bodyPartForm.value)
      .then((_) => observer.complete())
      .then((_) => this.loadData())
      .catch((err: string) => {
        alert(err);
        console.log(err);
      });
  }

  editBodyPart(observer: any) {
    this.bps
      .editBodyPart(this.bodyPartForm.value)
      .then((_) => observer.complete())
      .then((_) => this.loadData())
      .catch((error: string) => {
        alert(error);
      });
  }

  delete(id: number | null | undefined) {
    this.bps
      .removeBodyPart(<number>id)
      .then((_) => this.loadData())
      .catch((err: string) => {
        alert(err);
        console.log(err);
      });
  }

  cancel(observer: any): void {
    observer.complete();
  }

  loadData() {
    this.bps
      .getBodyParts()
      .then((res) => (this.bodyParts = res))
      .catch((err: string) => alert(err));
  }

  onSubmit(observer: any): void {
    if (!this.isEdit) {
      return this.addClient(observer);
    }
    return this.editBodyPart(observer);
  }

  editHandler(content: PolymorpheusContent<TuiDialogContext>, data: BodyPart): void {
    this.isEdit = true;
    this.bodyPartForm.setValue(data);
    this.dialogs
      .open(content, {
        closeable: true,
        dismissible: false,
        label: 'Редактирование',
      })
      .subscribe();
  }
}
