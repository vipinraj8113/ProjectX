import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../services/constant-url.service';

const BASE_URL = BaseURL;
@Injectable({
  providedIn: 'root',
})
export class MasterReportService {
  constructor(private http: HttpClient) {}

  //==============Facility Drop down data=====================
  Get_GropDown(dropDownField: any) {
    const Url = `${BASE_URL}/dropdown`;
    const reqBody = { name: dropDownField };
    return this.http.post(Url, reqBody);
  }
  //===================================================FACILITY====================================================
  //=======Fetch All facility data========
  Get_Facility_List_Data() {
    const Url = `${BASE_URL}/facility/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }

  //================================================FACILITY TYPE=================================================
  //========Fetch all Facility group data======
  Get_Facility_Type_Data() {
    const Url = `${BASE_URL}/facilitytype/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //=========Add facility group data=======
  Insert_FacilityType_Data(FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/insert`;
    const reqBody = {
      FacilityType: FacilityType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //===========Update Facility Group data====
  update_facilityTYPE_data(id: any, FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/update`;
    const reqBody = {
      ID: id,
      FacilityType: FacilityType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //===========Remove Facility Data=======
  Remove_FacilityType_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}facilitytype/delete/${id}`, {});
  }

  //===================================================FACILITY GROUP============================================
  Get_Facility_Group_Data() {
    const Url = `${BASE_URL}/facilitygROUP/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //=============Add facility group data=======
  add_FacilityGroup_Data(facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygroup/insert`;
    const reqBody = {
      FacilityGroup: facilitygroup,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //==============Update Facility Group data====
  update_facilityGroup_data(id: any, facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygROUP/update`;
    const reqBody = {
      ID: id,
      FacilityGroup: facilitygroup,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //============Remove Facility Data==========
  Remove_Facility_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}facilitygroup/delete/${id}`, {});
  }

  //====================================================CPT MASTER==========================================================
  //================Cpt Master List===========
  get_CptMaster_List() {
    const Url = `${BASE_URL}/CPTtype/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }

  //==============Add facility group data========
  Insert_CptType_Data(CptType: any, description: any) {
    const url = `${BASE_URL}/facilitygroup/insert`;
    const reqBody = {
      CptType: CptType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }

  //==============Update Facility Group data======
  update_CptType_data(id: any, CptType: any, Description: any) {
    const url = `${BASE_URL}/CPTtype/update`;
    const reqBody = {
      ID: id,
      CptType: CptType,
      Description: Description,
    };
    return this.http.post(url, reqBody);
  }

  //=========Remove Facility Data==========
  Remove_CPTType_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}CPTtype/delete/${id}`, {});
  }

  //========================================================CLINICIAN=========================================================
  get_Clinian_Table_Data() {
    const Url = `${BASE_URL}/clinician/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
}
