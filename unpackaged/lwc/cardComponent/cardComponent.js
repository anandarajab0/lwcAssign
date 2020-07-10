import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { refreshApex } from '@salesforce/apex';
export default class CardComponent extends LightningElement {
    @api account;
    @wire(CurrentPageReference) pageRef;

    displayAcctDetails(){
        fireEvent(this.pageRef, "eventdetails", this.account);
        
        console.log('this acc id ===>>>'+this.account.Id);
        
        
    }
    
    
}