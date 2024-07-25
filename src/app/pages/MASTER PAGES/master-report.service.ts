import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../../services/constant-url.service';

const BASE_URL = BaseURL;
const Token = JSON.parse(localStorage.getItem('Token'));

 const gender: any = [
  { description: 'Male' },
  { description: 'Female' },
  { description: 'Others' },
];
@Injectable({
  providedIn: 'root',
})
export class MasterReportService {
  constructor(private http: HttpClient) {}

  //======FEtch gender data======
  get_gender_Data():any {
    return gender;
  }
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Insurance Data=====
  Remove_Speciality_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}speciality/delete/${id}`, {},{headers});
  }

  //==========================================INSURANCE MASTER==========================================================
  //====Insurance List===========
  get_Insurance_List() {
    const Url = `${BASE_URL}/insurancecompany/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Update Insurance data======
  update_Insurance_data(
    id: any,
    InsuranceID: any,
    InsuranceName: any,
    InsuranceShortName: any
  ) {
    const url = `${BASE_URL}insurancecompany/update`;
    const reqBody = {
      ID: id,
      InsuranceID: InsuranceID,
      InsuranceName: InsuranceName,
      InsuranceShortName: InsuranceShortName,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Insurance Data=====
  Remove_Insurance_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}insurancecompany/delete/${id}`, {},{headers});
  }

  //===================================================FACILITY====================================================
  //=======Fetch All facility data========
  Get_Facility_List_Data() {
    const Url = `${BASE_URL}/facility/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }

  //=====Update Facility data====
  update_facility_data(
    id: any,
    FacilityLicense: any,
    FacilityName: any,
    Region: any,
    FacilityTypeID: any,
    FacilityGroupID: any,
    FacilityAddress: any,
    PostOfficeID: any
  ) {
    const url = `${BASE_URL}/facility/update`;
    const reqBody = {
      ID: id,
      FacilityLicense: FacilityLicense,
      FacilityName: FacilityName,
      Region: Region,
      FacilityTypeID: FacilityTypeID,
      FacilityGroupID: FacilityGroupID,
      FacilityAddress: FacilityAddress,
      PostOfficeID: PostOfficeID,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Facility Data=====
  Remove_Facility_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}speciality/delete/${id}`, {},{headers});
  }

  //================================================FACILITY TYPE=================================================
  //=====Fetch all Facility Type data======
  Get_Facility_Type_Data() {
    const Url = `${BASE_URL}/facilitytype/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //====Add facility Type data=======
  Insert_FacilityType_Data(FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/insert`;
    const reqBody = {
      FacilityType: FacilityType,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //====Update Facility Type data====
  update_facilityTYPE_data(id: any, FacilityType: any, description: any) {
    const url = `${BASE_URL}/facilitytype/update`;
    const reqBody = {
      ID: id,
      FacilityType: FacilityType,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //====Remove Facility Type Data=========
  Remove_FacilityType_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}facilitytype/delete/${id}`, {},{headers});
  }

  //===================================================FACILITY GROUP============================================
  Get_Facility_Group_Data() {
    const Url = `${BASE_URL}/facilitygROUP/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //=====Add facility group data=====
  Insert_FacilityGroup_Data(facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygroup/insert`;
    const reqBody = {
      FacilityGroup: facilitygroup,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //=====Update Facility Group data====
  update_facilityGroup_data(id: any, facilitygroup: any, description: any) {
    const url = `${BASE_URL}/facilitygROUP/update`;
    const reqBody = {
      ID: id,
      FacilityGroup: facilitygroup,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //===Remove Facility Data==========
  Remove_Facility_Group_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}facilitygroup/delete/${id}`, {},{headers});
  }

  //==========================================CPT MASTER==========================================================
  //======Cpt Master List===========
  get_CptMaster_List() {
    const Url = `${BASE_URL}/cptmaster/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Cpt Master Data==========
  Remove_CptMaster_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}cptmaster/delete/${id}`, {},{headers});
  }

  //==========================================CPY TYPE MASTER==========================================================
  //======Cpt type List===========
  get_CptType_List() {
    const Url = `${BASE_URL}/CPTtype/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //======Add Cpt type data========
  Insert_CptType_Data(CptType: any, description: any) {
    const url = `${BASE_URL}/CPTtype/insert`;
    const reqBody = {
      CptType: CptType,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Update Cpt type data======
  update_CptType_data(id: any, CptType: any, Description: any) {
    const url = `${BASE_URL}/CPTtype/update`;
    const reqBody = {
      ID: id,
      CptType: CptType,
      Description: Description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Cpt type Data==========
  Remove_CPTType_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}CPTtype/delete/${id}`, {},{headers});
  }

  //==========================================Denial TYPE MASTER==========================================================
  //======Denial type List===========
  get_DenialType_List() {
    const Url = `${BASE_URL}/denialtype/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //======Add Denial type data========
  Insert_DenialType_Data(DenialType: any, description: any) {
    const url = `${BASE_URL}/denialtype/insert`;
    const reqBody = {
      DenialType: DenialType,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Update Denial type data======
  update_DenialType_data(id: any, DenialType: any, Description: any) {
    const url = `${BASE_URL}/denialtype/update`;
    const reqBody = {
      ID: id,
      DenialType: DenialType,
      Description: Description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Denial type Data==========
  Remove_DenialType_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}denialtype/delete/${id}`, {},{headers});
  }

  //==========================================Denial TYPE MASTER==========================================================
  //======Denial category List===========
  get_DenialCategory_List() {
    const Url = `${BASE_URL}/denialcategory/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //======Add Denial category data========
  Insert_DenialCategory_Data(DenialCategory: any, description: any) {
    const url = `${BASE_URL}/denialcategory/insert`;
    const reqBody = {
      DenialCategorys: DenialCategory,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Update Denial category data======
  update_DenialCategory_data(id: any, DenialCategory: any, Description: any) {
    const url = `${BASE_URL}/denialcategory/update`;
    const reqBody = {
      ID: id,
      DenialCategorys: DenialCategory,
      Description: Description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Denial category Data==========
  Remove_DenialCategory_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}denialcategory/delete/${id}`, {},{headers});
  }
  //========================================================CLINICIAN=========================================================
  //===========Get all data list========
  get_Clinian_Table_Data() {
    const Url = `${BASE_URL}/clinician/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }

  //=======insert data ==========
  Insert_Clinician_Data(
    ClinicianLicense: any,
    ClinicianName: any,
    ClinicianShortName: any,
    SpecialityID: any,
    MajorID: any,
    ProfessionID: any,
    CategoryID: any,
    Gender: any
  ) {
    const url = `${BASE_URL}/clinician/insert`;
    const reqBody = {
      ClinicianLicense: ClinicianLicense,
      ClinicianName: ClinicianName,
      ClinicianShortName: ClinicianShortName,
      SpecialityID: SpecialityID,
      MajorID: MajorID,
      ProfessionID: ProfessionID,
      CategoryID: CategoryID,
      Gender: Gender,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Update Denial category data======
  update_Clinician_data(
    id: any,
    ClinicianLicense: any,
    ClinicianName: any,
    ClinicianShortName: any,
    SpecialityID: any,
    MajorID: any,
    ProfessionID: any,
    CategoryID: any,
    Gender: any
  ) {
    const url = `${BASE_URL}/clinician/update`;
    const reqBody = {
      ID: id,
      ClinicianLicense: ClinicianLicense,
      ClinicianName: ClinicianName,
      ClinicianShortName: ClinicianShortName,
      SpecialityID: SpecialityID,
      MajorID: MajorID,
      ProfessionID: ProfessionID,
      CategoryID: CategoryID,
      Gender: Gender,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }

  //=====Remove Denial category Data==========
  Remove_Clinician_Row_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}clinician/delete/${id}`, {},{headers});
  }

  //===================================================INSURANCE CLASSIFICATION============================================
  Get_InsuranceClassification_Data() {
    const Url = `${BASE_URL}/insuranceclassification/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //=====Add CLASSIFICATION data=====
  Insert_InsuranceClassification_Data(Classification: any, description: any) {
    const url = `${BASE_URL}/insuranceclassification/insert`;
    const reqBody = {
      Classification: Classification,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //=====Update CLASSIFICATION data====
  update_InsuranceClassification_data(
    id: any,
    Classification: any,
    description: any
  ) {
    const url = `${BASE_URL}/insuranceclassification/update`;
    const reqBody = {
      ID: id,
      Classification: Classification,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //===Remove CLASSIFICATION Data==========
  Remove_InsuranceClassification_Data(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(
      `${BASE_URL}insuranceclassification/delete/${id}`,
      {},{headers}
    );
  }

  //===================================================clinician profession============================================
  Get_ClinicianProfession_Data() {
    const Url = `${BASE_URL}/clinicianprofession/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //=====Add clinicianprofession data=====
  Insert_ClinicianProfession_Data(Profession: any, description: any) {
    const url = `${BASE_URL}/clinicianprofession/insert`;
    const reqBody = {
      Profession: Profession,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //=====Update clinicianprofession data====
  update_ClinicianProfession_data(id: any, Profession: any, description: any) {
    const url = `${BASE_URL}/clinicianprofession/update`;
    const reqBody = {
      ID: id,
      Profession: Profession,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //===Remove clinician profession Data==========
  remove_ClinicianProfession(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}clinicianprofession/delete/${id}`, {});
  }

  //===================================================clinician Major============================================
  Get_ClinicianMajor_Data() {
    const Url = `${BASE_URL}/clinicianmajor/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //=====Add clinician Major data=====
  Insert_ClinicianMajor_Data(Major: any, description: any) {
    const url = `${BASE_URL}/clinicianmajor/insert`;
    const reqBody = {
      Major: Major,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //=====Update clinician Major data====
  update_ClinicianMajor_data(id: any, Major: any, description: any) {
    const url = `${BASE_URL}/clinicianmajor/update`;
    const reqBody = {
      ID: id,
      Major: Major,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //===Remove clinicianMajor Data==========
  remove_ClinicianMajor(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}clinicianmajor/delete/${id}`, {});
  }

  //===================================================clinician Category============================================
  Get_ClinicianCategory_Data() {
    const Url = `${BASE_URL}/cliniciancategory/list`;
    const reqBody = {
      list: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(Url, reqBody,{headers});
  }
  //=====Add clinician Category data=====
  Insert_ClinicianCategory_Data(Category: any, description: any) {
    const url = `${BASE_URL}/cliniciancategory/insert`;
    const reqBody = {
      Category: Category,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //=====Update clinician category data====
  update_ClinicianCategory_data(id: any, Category: any, description: any) {
    const url = `${BASE_URL}/cliniciancategory/update`;
    const reqBody = {
      ID: id,
      Category: Category,
      Description: description,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(url, reqBody,{headers});
  }
  //===Remove cliniciancategory Data==========
  remove_ClinicianCategory(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': Token,
    });
    return this.http.post(`${BASE_URL}cliniciancategory/delete/${id}`, {});
  }
}
