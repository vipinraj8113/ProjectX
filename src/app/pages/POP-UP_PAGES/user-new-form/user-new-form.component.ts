import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageCropperComponent } from 'ngx-image-cropper';

import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DxTabPanelModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTabsModule,
  DxTextBoxModule,
  DxButtonModule,
  DxDataGridModule,
  DxTreeViewModule,
  DxValidatorModule,
  DxValidatorComponent,
  DxValidationSummaryModule,
  DxRadioGroupModule,
  DxDateBoxModule,
  DxFileUploaderModule,
  DxProgressBarModule,
  DxFileUploaderComponent,
  DxTooltipModule,
  DxValidationGroupModule,
  DxNumberBoxModule,
  
  
} from 'devextreme-angular';
import { MasterReportService } from '../../MASTER PAGES/master-report.service';
import { FormTextboxModule } from 'src/app/components';
import { BrowserModule } from '@angular/platform-browser';
import CountryList from 'country-list-with-dial-code-and-flag';

@Component({
  selector: 'app-user-new-form',
  templateUrl: './user-new-form.component.html',
  styleUrls: ['./user-new-form.component.scss'],
  providers:[MasterReportService,ReactiveFormsModule]
})
export class UserNewFormComponent implements OnInit,AfterViewChecked {

  @ViewChild('fileUploader', { static: false }) fileUploader!: DxFileUploaderComponent; // Update the type here
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  userData:any = {
    UserName: '',
    Password: '',
    DateofBirth: '',
    UserRoleID:'',
    Whatsapp: '',
    LoginName:'',
    GenderID:'',
    Email:'',
    Mobile:'',
    countryCode:'',
    IsInactive:false,
    InactiveReason:'',
    IsLocked:false,
    LockDateFrom:'',
    LockDateTo: '',
    LoginExpiryDate : '',
    PhotoFile:'',
    changePasswordOnLogin:false,
    user_facility: []
  };
  newUserData = this.userData;
  getNewUserData = () => ({ ...this.newUserData });

  selectedRows:any[]=[];
  userForm: FormGroup;
  images: string[] = [];
  stylingMode: any = 'primary';
  iconPosition: any = 'left';
  orientations: any = 'horizontal';
  scrollByContent: boolean = true;
  showNavButtons: boolean = true;
  isPasswordVisible = false;
  securityPolicyData:any;
  facilityList
  countryCodes: any[] = [];

  isDropZoneActive = false;
  imageSource = '';
  textVisible = true;
  progressVisible = false;
  progressValue = 0;
  allowedFileExtensions: string[] = ['.jpg', '.jpeg', '.gif', '.png'];
  selectedIndex: number = 0; // Default to the first tab (User)
  generatedPassword: string = '';
  tooltipVisible = false;
  onShowEvent = 'click';
  onHideEvent = 'click';
  selectedRowCount: number = 0; 
  totalRowCount: number = 0;
  // Method to handle tab click and set selected index
  onTabClick(event: any) {
    console.log(event);
    this.selectedIndex = event.itemIndex;
  }

  // Radio button options
  userTypes = ['Normal User', 'Clinician'];
  gender: any;
  userRole: any;
  clinicianOptions = ['clinician1', 'clinician2', 'clinician3'];
  isLocked: boolean = false;
  isInactive:boolean=false;
  showUserDetails: boolean = true; // Show User Details by default
  showOptions: boolean = true;     // Show Options by default
  selectedUserType: string = this.userTypes[0]; // Default to 'Normal User'
  tabItems = [
    { text: 'Facility' },
    { text: 'Options' }
  ];
  facilityData = [
    { license: 'F12345', facility: 'Facility 1' },
    { license: 'F67890', facility: 'Facility 2' },
    { license: 'F54321', facility: 'Facility 3' }
  ];

  facilityColumns = [
    { dataField: 'license', caption: 'Facility License' },
    { dataField: 'facility', caption: 'Facility' }
  ];

  constructor(private service:MasterReportService,private cdr: ChangeDetectorRef){
    
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();  // Triggers change detection
  }

  // Function to handle selection changes
  onSelectionChanged(e: any) {
    // Map selected row keys to the desired format
    this.userData.user_facility = e.selectedRowKeys.map((key: number) => ({      // Generate an ID for each entry starting from 1
      FacilityID: key        // Assign the selected FacilityID
    }));
    console.log('User Facility:', this.userData.user_facility);
    this.selectedRowCount = e.selectedRowKeys.length;
  }

  // checkLoginNameAvailability = (params: any) => {
  //   return new Promise((resolve) => {
  //     // Call your API to check if the login name exists
  //     this.service.getUserSecurityPolicityData()
  //       .subscribe(
  //         (response: any) => {

  //           // If the API returns true (exists), reject the validation
  //           if (response.exists) {
  //             resolve({ isValid: false, message: 'Login Name already exists' });
  //           } else {
  //             // If the login name does not exist, resolve the validation
  //             resolve({ isValid: true });
  //           }
  //         },
  //         (error) => {
  //           console.error('Error checking login name availability', error);
  //           resolve({ isValid: false, message: 'Error checking login name' });
  //         }
  //       );
  //   });
  // };

  onSubmit(){
    console.log('userform data',this.userForm)
  }

  toggleUserDetails(): void {
    this.showUserDetails = !this.showUserDetails;
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle the visibility flag
  }

  preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragEnter(e: Event) {
    this.preventDefaults(e);
    (e.target as HTMLElement).classList.add('highlight');
  }

  handleDragLeave(e: Event) {
    this.preventDefaults(e);
    (e.target as HTMLElement).classList.remove('highlight');
  }

  handleDrop(event: DragEvent) {
    this.preventDefaults(event);
    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];
      this.readFile(file);
    }
  }

  handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      this.newUserData.PhotoFile = result;
      console.log( this.newUserData.PhotoFile,"kkk")
      this.images.push(result); // Add the base64 image to the gallery
    };
    reader.readAsDataURL(file); // Read the file as a base64 string
  }

  // readFile(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     // Read the file as an ArrayBuffer (binary format)
  //     const arrayBuffer = reader.result as ArrayBuffer;
      
  //     // Directly store the ArrayBuffer or its binary representation into the newUserData object
  //     this.newUserData.PhotoFile = arrayBuffer; // Storing as ArrayBuffer for binary data
      
  //     console.log(this.newUserData.PhotoFile, "Binary Data Ready to be Sent to DB");
  
  //     // Optionally, display the image using URL.createObjectURL for gallery purposes
  //     const imageUrl = URL.createObjectURL(new Blob([arrayBuffer]));
  //     this.images.push(imageUrl); // Add the image URL to the gallery for display
  //   };
  
  //   // Read the file as an ArrayBuffer to get binary data
  //   reader.readAsArrayBuffer(file);
  // }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        this.images.push(reader.result);
      }
    };
  }
  removeImage(index: number) {
    // Remove image logic
    this.images.splice(index, 1);
    // Clear PhotoFile if the last image is removed
    if (this.images.length === 0) {
      this.newUserData.PhotoFile = '';
    }
  }

  
  getCountryCodeList() {
    const codes = CountryList.getAll(); // Get all country codes
    this.countryCodes = codes.map((country: any) => ({
      data: country.data
    }));
    console.log(this.countryCodes, 'country code'); // Optional: For debugging
  }

  // Method to format the display value with flag and dial code
  displayCountryCode(item: any) {
    return item ? `${item.data.flag} - ${item.data.dial_code} - ${item.data.name}` : '';
  }

  ngOnInit(): void {
    this.getDropDownData('GENDER_DATA');
    this.getDropDownData('USER_ROLE');
    this.getUserSecurityPolicyData();
    this.getFacilityData();
    this.getCountryCodeList();
    
    this.setDefaultCountryCode();
    this.updateMobileNumber(); // Update mobile field with the default country code
  
  }

  setDefaultCountryCode() {
    const defaultCountryCode = '+971'; // Default country code
    const defaultCountry = this.countryCodes.find(
      (code) => code.data.dial_code === defaultCountryCode
    );

    if (defaultCountry) {
      this.newUserData.countryCode = defaultCountry.data.dial_code; // Set the country code
    }
  }

  getDropDownData(data:any){
    this.service.Get_GropDown(data).subscribe(res=>{
      console.log(res,"res");
      if(data==='GENDER_DATA')
      {
       this.gender=res;
        console.log("gender",this.gender)
      }
      if(data==='USER_ROLE'){
        this.userRole=res;
        console.log(this.userRole,'userRole')
      }
    })
  }
  getUserSecurityPolicyData(){
    this.service.getUserSecurityPolicityData().subscribe((res:any)=>{
      this.securityPolicyData = res.data[0];
      console.log('user security policy data',this.securityPolicyData)
      this.generatedPassword = this.generateRandomPassword();
    })
  }
  getFacilityData(){
    this.service.Get_Facility_List_Data().subscribe((res:any)=>{
      this.facilityList=res.data;
      console.log('facility data',this.facilityList)
    })
  }
  generateRandomPassword(): string {
    // Fetch the minimum length from security policy; default to 8 if not provided
    const minLength = Math.max(this.securityPolicyData.MinimumLength || 8, 8); // Ensure a minimum length of at least 8
  
    // Set a maximum length (e.g., 12) or based on your requirement
    const maxLength = 12;
  
    // Calculate random length between minLength and maxLength
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
    const specialChars = "@#$%&*";
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
  
    // Initialize password and characters array
    let password = '';
    const characters = [];
    const requiredCharacters = [];
  
    // Include character sets and ensure at least one character from each selected set
    if (this.securityPolicyData.Numbers) {
      characters.push(numbers);
      requiredCharacters.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }
    if (this.securityPolicyData.UppercaseCharacters) {
      characters.push(upperCase);
      requiredCharacters.push(upperCase.charAt(Math.floor(Math.random() * upperCase.length)));
    }
    if (this.securityPolicyData.LowercaseCharacters) {
      characters.push(lowerCase);
      requiredCharacters.push(lowerCase.charAt(Math.floor(Math.random() * lowerCase.length)));
    }
    if (this.securityPolicyData.SpecialCharacters) {
      characters.push(specialChars);
      requiredCharacters.push(specialChars.charAt(Math.floor(Math.random() * specialChars.length)));
    }
  
    // Ensure there are character sets to choose from
    if (characters.length === 0) {
      throw new Error('No character sets selected based on the security policy.');
    }
  
    // Add at least one character of each required type to the password
    requiredCharacters.forEach(char => password += char);
  
    // Calculate remaining length to fill
    const remainingLength = length - requiredCharacters.length;
  
    // Fill the rest of the password with random characters from the selected sets
    for (let i = 0; i < remainingLength; i++) {
      const charSet = characters[Math.floor(Math.random() * characters.length)];
      password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
  
    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }

  refreshPassword(): void {
    this.generatedPassword = this.generateRandomPassword(); // Call your existing method to generate a random password
  }

  updateMobileNumber() {
    // Find the selected country code
    const selectedCountry = this.countryCodes.find(
      (code) => code.data.dial_code === this.newUserData.countryCode
    );
  
    if (selectedCountry) {
      const dialCode = selectedCountry.data.dial_code; // Extract country code
  
      // Extract and validate the mobile number part
      const mobileNumber = this.getOnlyMobileNumber(this.newUserData.Mobile);
      const validMobileNumber = this.validateMobileNumber(mobileNumber);
  
      // Update the mobile field with valid country code and mobile number
      this.newUserData.Mobile = `${dialCode} ${validMobileNumber}`;
      
      console.log('Updated Mobile:', this.newUserData.Mobile); // For debugging
    }
  }
  
  getOnlyMobileNumber(fullPhoneNumber: string): string {
    // Extract mobile number by removing the dial code part
    const selectedCountry = this.countryCodes.find(
      (code) => fullPhoneNumber.startsWith(code.data.dial_code)
    );
  
    if (selectedCountry) {
      return fullPhoneNumber.replace(selectedCountry.data.dial_code, '').trim();
    }
  
    return fullPhoneNumber; // Return as is if no match found
  }
  

  onMobileInputChange(event: any) {
    const newValue = event.value;
  
    // Find the selected country code
    const selectedCountry = this.countryCodes.find(
      (code) => code.data.dial_code === this.newUserData.countryCode
    );
  
    if (selectedCountry) {
      const dialCode = selectedCountry.data.dial_code;
  
      // Ensure the dial code part remains the same and prepend it if needed
      const mobileNumberPart = newValue.replace(dialCode, '').trim();
      const validMobileNumber = this.validateMobileNumber(mobileNumberPart);
  
      // Only update the mobile field if it starts with valid digits and does not start with zero
      this.newUserData.Mobile = `${dialCode} ${validMobileNumber}`;
    }
  }

  validateMobileNumber(mobileNumber: string): string {
    // Remove any non-digit characters
    const digitsOnly = mobileNumber.replace(/\D/g, '');
  
    // Ensure the number does not start with zero and return valid number or empty string if invalid
    return digitsOnly.startsWith('0') ? '' : digitsOnly;
  }

 
  autoBindWhatsapp() {
    console.log('WhatsApp field focused.');
    setTimeout(() => {
      if (!this.newUserData.Whatsapp && this.newUserData.Mobile) {
        console.log('Populating WhatsApp with Mobile:', this.newUserData.Mobile);
        this.newUserData.Whatsapp = this.newUserData.Mobile;
      }
    }, 0);
  }
  
  

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPassword).then(() => {
      this.tooltipVisible=true;
      console.log('Password copied to clipboard');
    }).catch(err => {
      console.error('Error copying password to clipboard', err);
    });
  }

  
  


}
@NgModule({
  imports: [
    CommonModule,
    DxTabPanelModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxTabsModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxTreeViewModule,
    DxValidatorModule,
    DxRadioGroupModule,
    FormTextboxModule,
    DxDateBoxModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    BrowserModule,
    DxTooltipModule,
    ReactiveFormsModule,
    DxValidationGroupModule,
    DxNumberBoxModule,

    
  ],
  providers: [],
  declarations: [UserNewFormComponent],
  exports: [UserNewFormComponent],
})
export class UserNewFormModule {}
