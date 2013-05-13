Ext.define('ExtMVC.model.ClientInfo', {
  extend: 'Ext.data.Model',
  fields: [
  { name: 'id', mapping: 'id.localId' },
  { name: 'name'},
  { name: 'accountNumber'}
  ],

   statics: {
    getClientBalancesStore: function() {
      var config = getStoreConfig(this.modelName, 'clientCardApi.getClientBalances', {
        autoLoad: false
      });

     return getStore('model_stores.'+this.modelName, config);
    }
  }
});
