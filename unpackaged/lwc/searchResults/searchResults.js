import { LightningElement,api,wire } from 'lwc';
import getAccountList from '@salesforce/apex/searchRecord.searchType';
import { refreshApex } from '@salesforce/apex';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener,unregisterAllListeners } from 'c/pubsub';
export default class SearchResults extends LightningElement {
    @api selectedValue;
    @wire (getAccountList,{searchName:'$selectedValue'}) accList;

    renderedCallback(){
        console.log('accList===>>>'+this.accList);
        var abc = JSON.stringify(this.accList);
        console.log('abc===>>>'+this.abc);
    }
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        //register application event sent by cardcomponent
        console.log('inside connectedCallback')
        registerListener("refreshaccount", this.refreshData,this);
    }
    
    refreshData(){
        console.log('inside refresh');
        return refreshApex(this.accList);
    }

}