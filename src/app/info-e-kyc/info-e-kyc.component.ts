import { Component, OnInit } from '@angular/core';
import { ItemData } from '../utils/models/ekyc.models';
import { IndentityType } from '../utils/models/indentitytype.models';
import { Category, CateButton } from '../utils/models/filter.models';
import { EkycServiceService } from '../utils/services/ekyc-service.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { ModalFailComponent } from './modal-fail/modal-fail.component';

@Component({
  selector: 'app-info-e-kyc',
  templateUrl: './info-e-kyc.component.html',
  styleUrls: ['./info-e-kyc.component.scss'],
})
export class InfoEKYCComponent implements OnInit {
  constructor(
    private ekycService: EkycServiceService,
    private modalService: NgbModal
  ) {}
  cateButton: CateButton[] = [
    {
      code: 'CMND',
      engSub: 'Identity Card',
      vietSub: 'Chứng minh nhân dân (cũ)',
      isActive: true,
      icon: 'fa-address-card',
    },
    {
      code: 'PASSPORT',
      engSub: 'Passport',
      vietSub: 'Hộ chiếu',
      isActive: false,
      icon: 'fa-atlas',
    },
    {
      code: 'CCCD',
      engSub: 'Chip-based ID Card',
      vietSub: 'Căn cước công dân gắn chip',
      isActive: false,
      icon: 'fa-microchip',
    },
  ];
  isEdited = false;
  isClick = false;
  indentityType = '';
  datas = [];
  ngOnInit(): void {
    this.ekycService.getEkyc().subscribe((res) => {
      this.datas = res.object.config;
      this.indentityType = res.object.identityType;
    });
  }
  saveEdit(): void {
    this.datas.forEach((item) => {
      if (
        item.warning < 0 ||
        item.success < 0 ||
        item.warning > item.success ||
        item.warning > 100 ||
        item.success > 100
      ) {
        this.modalService.open(ModalFailComponent);
        return false;
      }
    });
    if (
      !this.datas.some(
        (item) =>
          item.warning < 0 ||
          item.success < 0 ||
          item.warning > item.success ||
          item.warning > 100 ||
          item.success > 100
      )
    ) {
      const updateData = this.datas.map((item) => {
        return {
          code: item.code,
          description: item.description,
          nameField: item.nameField,
          status: item.status,
          success: item.success,
          typeField: item.typeField,
          warning: item.warning,
        };
      });
      this.ekycService
        .saveEdit(updateData, this.indentityType)
        .subscribe((res) => {
          this.modalService.open(ModalSuccessComponent);
          this.isEdited = false;
        });
    }
  }
  changeActive(code: string) {
    if (this.isEdited) {
      const r = confirm('Leave site?\nChanges you made may not be saved.');
      if (r) {
        // this.datas$ = this.ekycService.datas$;
        this.setActiveBtn(code);
        this.ekycService
          .changeTabData(code)
          .subscribe((res) => (this.datas = res.object.config));
        this.isEdited = false;
        this.modalService.dismissAll();
      }
    } else {
      this.setActiveBtn(code);
      this.ekycService.changeTabData(code).subscribe((res) => {
        this.datas = res.object.config;
        this.indentityType = res.object.identityType;
      });
      this.modalService.dismissAll();
    }
  }
  private setActiveBtn(code: string) {
    this.cateButton.forEach((btn) => (btn.isActive = btn.code === code));
  }
  startEdit() {
    this.isEdited = !this.isEdited;
  }

  open(content) {
    this.modalService.open(content);
  }
}
