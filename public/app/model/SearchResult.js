Ext.define('ExtMVC.model.SearchResult', {
  extend: 'Ext.data.Model',
  fields: [
  {
    name: 'uuid'
  },
  {
    name: 'clientId', 
    mapping: 'searchResult.id.localId'
  },
  {
    name: 'subscriberId',
    mapping: 'searchResult.subscriberId.localId'
  },
  {
    name: 'msisdn',
    mapping: 'searchResult.msisdn'
  },
  {
    name: 'name',
    mapping: 'searchResult.name'
  }
  ]
});
