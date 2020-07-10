public with sharing class searchRecord {
    @AuraEnabled(Cacheable=true)
    public static List<Account> search(Integer LimitRec, String searchName) {
        searchName = '%' + searchName + '%';
        list<Account> accList = [SELECT  Name  FROM Account where Name like:searchName LIMIT:LimitRec]; 

        if(accList.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }

        return accList;
        }

        @AuraEnabled(Cacheable=true)
        public static List<Account> searchType(String searchName) {
            searchName = '%' + searchName + '%';
            list<Account> accList = [SELECT  Id,Name,Type,Phone,AnnualRevenue,Industry,Website FROM Account where Type like:searchName]; 
    
            if(accList.isEmpty()) {
                throw new AuraHandledException('No Record Found..');
            }
    
            return accList;
            }  
}