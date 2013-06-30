Ext.define('ExtMVC.model.ClientInfo', {
  extend: 'Ext.data.Model',
  fields: [
  {
    name: 'id',
    mapping: 'id.localId'
  },
  {
    name: 'name'
  },

  {
    name: 'accountNumber'
  }
  ],

  statics: {

    getClientStore: function(pageUuid) {
      var config = getStoreConfig(this.modelName, 'clientCardApi.getClient', {
        autoLoad: false
      });
      config.proxy.paramOrder = 'pageUuid';
      config.proxy.extraParams = {
        'pageUuid':pageUuid
      };

      return getStore(this.modelName+'.getClientStore', config);
    },
    getClientSubscriber: function(pageUuid) {
      var config = getStoreConfig(this.modelName, 'clientCardApi.getSelectedSubscriber', {
        autoLoad: false
      });
      config.proxy.paramOrder = 'pageUuid';
      config.proxy.extraParams = {
        'pageUuid':pageUuid
      };

      return getStore(this.modelName + '.getClientSubscriber', config);
    },

    getBalancesStore: function(pageUuid, method) {
      var fn = 'clientCardApi.'+method;
      var config = getStoreConfig('', fn, {
        autoLoad: false,
         fields: [
 	     	             {name: 'balance.name'},
 	     	             {name: 'amount', type: 'float'}
 	     	            ]
      });
      config.proxy.paramOrder = 'pageUuid';
      config.proxy.extraParams = {
        'pageUuid':pageUuid
      };

      return getStore(this.modelName + '.'+fn, config);
    },
     getSubscriber: function(pageUuid, subscriberId) {
      var config = getStoreConfig(this.modelName, 'clientCardApi.selectSubscriber', {
        autoLoad: false
      });
      config.proxy.paramOrder = 'pageUuid,subscriberId';
      config.proxy.extraParams = {
        'pageUuid':pageUuid,
        'subscriberId':subscriberId
      };

      return getStore(this.modelName + '.getSubscriber', config);
    }



  }
});
