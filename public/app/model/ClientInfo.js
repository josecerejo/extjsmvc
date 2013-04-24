Ext.define('ExtMVC.model.ClientInfo', {
  extend: 'Ext.data.Model',
  fields: [
  { name: 'id', mapping: 'id.localId' },
  { name: 'name'},
  { name: 'accountNumber'}
  ]
});
