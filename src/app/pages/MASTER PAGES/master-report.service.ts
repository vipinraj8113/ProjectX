import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../services/constant-url.service';

const BASE_URL = BaseURL;
@Injectable({
  providedIn: 'root',
})
export class MasterReportService {
  constructor(private http: HttpClient) {}

  //======Facility Drop down data=====================
  Get_GropDown(dropDownField: any) {
    const Url = `${BASE_URL}/dropdown`;
    const reqBody = { name: dropDownField };
    return this.http.post(Url, reqBody);
  }

  //==========================================INSURANCE MASTER==========================================================
  //====Insurance List===========
  get_Speciality_List() {
    const Url = `${BASE_URL}/speciality/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //=====Add Insurance data========
  Insert_Speciality_Data(
    SpecialityCode: any,
    SpecialityName: any,
    SpecialityShortName: any,
    Description: any
  ) {
    const url = `${BASE_URL}/speciality/insert`;
    const reqBody = {
      SpecialityCode: SpecialityCode,
      SpecialityName: SpecialityName,
      SpecialityShortName: SpecialityShortName,
      Description: Description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Update Insurance data======
  update_Speciality_data(
    id: any,
    SpecialityCode: any,
    SpecialityName: any,
    SpecialityShortName: any,
    Description: any
  ) {
    const url = `${BASE_URL}speciality/update`;
    const reqBody = {
      ID: id,
      SpecialityCode: SpecialityCode,
      SpecialityName: SpecialityName,
      SpecialityShortName: SpecialityShortName,
      Description: Description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Remove Insurance Data=====
  Remove_Speciality_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}speciality/delete/${id}`, {});
  }

  //==========================================INSURANCE MASTER==========================================================
  //====Insurance List===========
  get_Insurance_List() {
    const Url = `${BASE_URL}/insurancecompany/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //=====Add Insurance data========
  Insert_Insurance_Data(
    InsuranceID: any,
    InsuranceName: any,
    InsuranceShortName: any
  ) {
    const url = `${BASE_URL}/insurancecompany/insert`;
    const reqBody = {
      InsuranceID: InsuranceID,
      InsuranceName: InsuranceName,
      InsuranceShortName: InsuranceShortName,
    };
    return this.http.post(url, reqBody);
  }

  //=====Update Insurance data======
  update_Insurance_data(
    InsuranceID: any,
    InsuranceName: any,
    InsuranceShortName: any
  ) {
    const url = `${BASE_URL}insurancecompany/update`;
    const reqBody = {
      InsuranceID: InsuranceID,
      InsuranceName: InsuranceName,
      InsuranceShortName: InsuranceShortName,
    };
    return this.http.post(url, reqBody);
  }

  //=====Remove Insurance Data=====
  Remove_Insurance_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}insurancecompany/delete/${id}`, {});
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

  //=====Update Facility data====
  update_facility_data(id: any, FacilityLicense: any, FacilityName: any,Region:any,FacilityTypeID:any,FacilityGroupID:any,FacilityAddress:any,PostOfficeID:any) {
    const url = `${BASE_URL}/facility/update`;
    const reqBody = {
      ID: id,
      FacilityLicense: FacilityLicense,
      FacilityName: FacilityName,
      Region:Region,
      FacilityTypeID:FacilityTypeID,
      FacilityGroupID:FacilityGroupID,
      FacilityAddress:FacilityAddress,
      PostOfficeID:PostOfficeID
    };
    return this.http.post(url, reqBody);
  }

   //=====Remove Facility Data=====
   Remove_Facility_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}speciality/delete/${id}`, {});
  }

  //================================================FACILITY TYPE=================================================
  //=====Fetch all Facility Type data======
  Get_Facility_Type_Data() {
    const Url = `${BASE_URL}/facilitytype/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //====Add facility Type data=======
  Insert_FacilityType_Data(FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/insert`;
    const reqBody = {
      FacilityType: FacilityType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //====Update Facility Type data====
  update_facilityTYPE_data(id: any, FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/update`;
    const reqBody = {
      ID: id,
      FacilityType: FacilityType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //====Remove Facility Type Data=========
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
  //=====Add facility group data=====
  Insert_FacilityGroup_Data(facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygroup/insert`;
    const reqBody = {
      FacilityGroup: facilitygroup,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //=====Update Facility Group data====
  update_facilityGroup_data(id: any, facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygROUP/update`;
    const reqBody = {
      ID: id,
      FacilityGroup: facilitygroup,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }
  //===Remove Facility Data==========
  Remove_Facility_Group_Data(id: any) {
    return this.http.post(`${BASE_URL}facilitygroup/delete/${id}`, {});
  }

  //==========================================CPT MASTER==========================================================
  //======Cpt Master List===========
  get_CptMaster_List() {
    const Url = `${BASE_URL}/cptmaster/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //======Add Cpt Master data========
  Insert_CptMaster_Data(
    CPTTypeID: any,
    CPTCode: any,
    CPTShortName: any,
    CPTName: any,
    description: any
  ) {
    const url = `${BASE_URL}/cptmaster/insert`;
    const reqBody = {
      CPTTypeID: CPTTypeID,
      CPTCode: CPTCode,
      CPTShortName: CPTShortName,
      CPTName: CPTName,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Update Cpt Master data======
  update_CptMaster_data(
    id: any,
    CPTTypeID: any,
    CPTCode: any,
    CPTShortName: any,
    CPTName: any,
    description: any
  ) {
    const url = `${BASE_URL}/cptmaster/update`;
    const reqBody = {
      ID: id,
      CPTTypeID: CPTTypeID,
      CPTCode: CPTCode,
      CPTShortName: CPTShortName,
      CPTName: CPTName,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Remove Cpt Master Data==========
  Remove_CptMaster_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}cptmaster/delete/${id}`, {});
  }

  //==========================================CPY TYPE MASTER==========================================================
  //======Cpt type List===========
  get_CptType_List() {
    const Url = `${BASE_URL}/CPTtype/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //======Add Cpt type data========
  Insert_CptType_Data(CptType: any, description: any) {
    const url = `${BASE_URL}/CPTtype/insert`;
    const reqBody = {
      CptType: CptType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Update Cpt type data======
  update_CptType_data(id: any, CptType: any, Description: any) {
    const url = `${BASE_URL}/CPTtype/update`;
    const reqBody = {
      ID: id,
      CptType: CptType,
      Description: Description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Remove Cpt type Data==========
  Remove_CPTType_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}CPTtype/delete/${id}`, {});
  }

  //==========================================Denial TYPE MASTER==========================================================
  //======Denial type List===========
  get_DenialType_List() {
    const Url = `${BASE_URL}/denialtype/list`;
    const reqBody = {
      list: [],
    };
    return this.http.post(Url, reqBody);
  }
  //======Add Denial type data========
  Insert_DenialType_Data(DenialType: any, description: any) {
    const url = `${BASE_URL}/denialtype/insert`;
    const reqBody = {
      DenialType: DenialType,
      Description: description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Update Denial type data======
  update_DenialType_data(id: any, DenialType: any, Description: any) {
    const url = `${BASE_URL}/denialtype/update`;
    const reqBody = {
      ID: id,
      DenialType: DenialType,
      Description: Description,
    };
    return this.http.post(url, reqBody);
  }

  //=====Remove Denial type Data==========
  Remove_DenialType_Row_Data(id: any) {
    return this.http.post(`${BASE_URL}denialtype/delete/${id}`, {});
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
