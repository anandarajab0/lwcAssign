import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners,fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_ANNREV from '@salesforce/schema/Account.AnnualRevenue';
export default class LdsDetailComponent extends LightningElement {

    @track details;
    @track detailType;
    @track selectedFields;
    @track recordView = false;
    @track recordEdit = false;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener("eventdetails", this.sutUpDetails, this);
        
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    sutUpDetails(dogDtl){
        var abc = JSON.stringify(dogDtl);
        console.log('details--->>>'+this.abc);
        this.details = dogDtl.Id;
        this.detailType = dogDtl.Type;
        console.log('details--->>>'+this.details);
        console.log('detailsType--->>>'+this.detailType);
        this.recordView = true;
        this.recordEdit = false;
    }
    //searchName : this.searchKey
    //@wire (getAccountList,{searchName : '$detailType'}) account;
    selectedFields = [ACCOUNT_NAME, ACCOUNT_TYPE, ACCOUNT_WEBSITE,ACCOUNT_INDUSTRY,ACCOUNT_ANNREV];
    editRec(){
        this.recordView = false;
        this.recordEdit = true;
    }

    handleAccountEdit(event){
        
        let message = 'Account has been edited successfully !!!';
        
        const toastEvent  = new ShowToastEvent({
            mode: 'sticky',
            title: 'Successfull',
            message: message,
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);
        fireEvent(this.pageRef, "refreshaccount","");
        
    }
   handleSubmit(event){
    this.recordView = true;
    this.recordEdit = false;
    
    }
}