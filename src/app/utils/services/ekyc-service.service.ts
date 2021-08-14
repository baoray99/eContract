import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ItemData } from '../models/ekyc.models';
import { IndentityType } from '../models/indentitytype.models';
import { Category } from '../models/filter.models';
import { catchError } from 'rxjs/operators';
import {
  HttpParams,
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EkycServiceService {
  private datas: ItemData[];
  private datasSubject: BehaviorSubject<ItemData[]> = new BehaviorSubject<
    ItemData[]
  >([]);
  datas$: Observable<ItemData[]> = this.datasSubject.asObservable();
  constructor(private http: HttpClient) {}
  private token =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZXZkdjUiLCJwYWNrYWdlRXhwaXJlZCI6MTQzLCJhdXRob3JpdGllcyI6WyJFU08yMDAxIiwiRVNPMzAwMyIsIkVTTzQwMDQiLCJFQ1QyMzAxIiwiRVNPMjAwMiIsIkVTTzMwMDIiLCJFU080MDAzIiwiRVNPMDAwMSIsIkVTTzEwMDIiLCJFU08yMDAzIiwiRVNPMzAwNSIsIkVTTzAwMDIiLCJFU08yMDA0IiwiRVNPMzAwNCIsIkVTTzQwMDUiLCJEU0lHTiIsIkVDVDIzMDAiLCJFU0lHTiIsIkNNVDAwMDEiLCJFU08zMDAxIiwiRVNPNDAwMiIsIkVTTzQwMDEiXSwiY2xpZW50X2lkIjoiY2xpZW50YXBwIiwiaWRVc2VyIjoiOGVmNzc1OGMtYzVlZC00NTQ2LTg2NGItZGZhY2M1ZDUyODgzIiwiYXVkIjpbInRlbXBsYXRlIiwiZXNvbHV0aW9uIiwiaWFtIiwiZHNpZ24iLCJlc2lnbiIsInJlc3RzZXJ2aWNlIl0sInNjb3BlIjpbXSwiZG9tYWluIjoiZWNvbnRyYWN0LWRldi52bnB0aXQzLnZuIiwicGFja2FnZU5hbWUiOm51bGwsImV4cCI6MTYyODYwNDY4MiwianRpIjoiODRkY2IzYjctMDNkNC00N2ViLTkxZjEtY2VkNjA0MjU1MjRlIiwia2V5IjoiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlDZHdJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FtRXdnZ0pkQWdFQUFvR0JBSzNFdE4zN0xzcDByd25RXG5xQVJWRXM2aFR4UFVkMDNxNE9SUVY2ZDJRS1hkMmxVVWEyUmFSVHVoNHFYRGQ3UVdXVXpyUXJBMVMrQ0dvbElJXG5YUWpGcnpobzd0WmZLc25xS3BXbW03NjlvdU1adnZFV1NQYVRNM3JlSkQvTW8xVk5yZE9QcDEvbzBJK1ZYbkZ0XG5oOEwxM3NVSDNhM2pFd2hZbFcvQXhSUVE3WW1QQWdNQkFBRUNnWUVBcGdsbi9SZU9qUnJUU2VDYk9wQ0RpUGJ2XG5WWFpWalJrYVRHNU1ZeElHRWJjYmNPSXkvMCtXQ2JYVW1DbGV6cS93SWlSRnM1TXBibCtXNkNWZnFBc2tNWUc1XG5HNXhEaFo5cFpMNG1WMVhGNGFUZ1ovWlVySlRrZUhDZXJpeVNuRkNIZnh0K0dhLzczN1VGRHEwK2lYTDVEYlJvXG5WVUFLZHVTUmxRUkhnVHNXWXJrQ1FRRGZCRVVkME5tcHJjYmNRQzUrNVRXWjVZYnFPb21aTDBTbDNzRmFFZGlDXG5ONjhqM3g0Z1VLUVc4T0RGOFd4bSthVHAyVWpIWGtGU29ZeGNJWHlDNmJMOUFrRUF4M2ZUWkF2ZWFGM2lob2dxXG5wTGVqVHcyK0xlS2RNWHF6RXR0WDh2RjQyM3pReFVvL3liSDR1amltYmo0b3pGUW1xQU94ZGJvYXYwSnpZRVZVXG51R1hTZXdKQVlyNElRQ2hOaDBRcTdTLzVwak9rSk95c2JKN1lkNXVuSUczZFhCelVxT3N3djRnMVZZZCs3NjFkXG5TQ2Nab1FwZGl6Q3FlYU53OXI0U1lHUnZOYU4xblFKQURscUZEN0g2OHkrdVdWZjdHWmROWFNiMEJJRkdKb1ZaXG4xWVdMTXFSRnVpV2xNRTFEZ2RRWXZlM05yQ2swN2w4djJPOUxHZG1taXhUUkVLQnNsRWhmZVFKQkFLZlBjdVFVXG43Q2NJTVBaR2QrSUtnTW1hOGJReno1U1lPZVpLbFAvWmo2RWZaMWZ2Tm1xaUxKNXArMlAyRGNIdm1JNFE2ZnJnXG5ETlE0ZkxFNjFCdEtpUk09XG4tLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tXG4iLCJjcmVhdGVEYXRlIjoxNjI4NTE4MjgyNTEwfQ.LWAN-bG1_F5-T28qetEl135PHMAlhunes0lT4eE3hFiHpCPI5bojD3hoCLL4Vl8_aekEakSKRZqBDqqUt7_FiaPYEigRjkcFBe3dAonhmK1AGqbCXiUOQURDCPEVXZtvCYqP9DCTHjwMa_HZCbfSf8agcUSKxDuPX7t_8NnWFjDuGn5oQsJ4-BzHt544Kg6uhpXguDPK80kMhdDpQctoUVl7eR_C924Je2Oj_G6gVLp3ktnkNzyj7ZyyQDM3Dk8qxT1DZH4PX_EHvM9hZiX5TRGbGimj9Qcv0juTQj5at2wdcYmhM427twrEP0VkMIdokJm2NOSsK84rlp29VT1nxg';
  private partyId = '8ef7758c-c5ed-4546-864b-dfacc5d52883';
  private baseUrl =
    'https://apigateway-econtract-dev.vnptit3.vn/esignature-service/config/config-ekyc';
  getRequestOptions() {
    var token = this.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return httpOptions;
  }
  errorHandle(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  getListIndentityTypes(): Observable<IndentityType[]> {
    return this.http
      .get<IndentityType[]>(
        'https://apigateway-econtract-dev.vnptit3.vn/esignature-service/config/list-identity-types'
      )
      .pipe(catchError(this.errorHandle));
  }
  getEkyc(): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}?identityType=CMND&partyId=${this.partyId}`,
        this.getRequestOptions()
      )
      .pipe(catchError(this.errorHandle));
  }
  updateData() {
    this.datasSubject.next(this.datas);
  }
  changeTabData(code: string): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}?identityType=${code}&partyId=${this.partyId}`,
        this.getRequestOptions()
      )
      .pipe(catchError(this.errorHandle));
  }
  saveEdit(datas: any[], identityType: string): Observable<any> {
    console.log(datas, identityType);
    return this.http
      .put(
        `https://apigateway-econtract-dev.vnptit3.vn/esignature-service/config/config-ekyc?identityType=${identityType}&partyId=${this.partyId}`,
        datas,
        this.getRequestOptions()
      )
      .pipe(catchError(this.errorHandle));
  }
}
