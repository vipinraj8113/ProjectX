import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../services/constant-url.service';

const BASE_URL = BaseURL;
@Injectable({
  providedIn: 'root',
})
export class MasterReportService {
  constructor(private http: HttpClient) {}
//==============Fetch all Facility group data================
  Get_Facility_Group_Data() {
    const Url = `${BASE_URL}/facilitygROUP/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
//=============Fetch All facility data=======================
Get_Facility_List_Data() {
  const Url = `${BASE_URL}/facility/list`;
  const reqBody = {
    list: [],
  };
  return this.http.post(Url, reqBody);
}
//==============Facility Drop down data=====================
Get_GropDown(dropDownField:any){
  const Url = `${BASE_URL}/dropdown`;
  const reqBody = {"name":dropDownField}
  return this.http.post(Url, reqBody);
}

}
