Ext.define('ExtMVC.model.SearchResult', {
  extend: 'Ext.data.Model',
   fields: [{name: 'id'},{name: 'name'},{name: 'accountNumber'}],
  statics: {
    getStore: function() {
      var config = getStoreConfig(this.modelName, 'billingApiWrapper.findClientByMsisdnAndIdentityCardNumber', {
        autoLoad: false
      });
      config.proxy.paramOrder = 'msisdn,idCard';
      //config.proxy.reader.root = 'result';

      return getStore('model_stores.' + this.modelName, config);
    },

     getStoreSearch: function() {
       var config = {
        autoLoad: false,
        proxy: {
          type: 'ajax',
          url:  'clientsearch/find',
          actionMethods:  {create: "POST", read: "POST", update: "POST", destroy: "POST"}
        },
        model: this.modelName
      };


      return getStore('model_stores.'+this.modelName+'_search', config);
    }
  }
});
