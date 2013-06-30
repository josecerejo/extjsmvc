Ext.define('ExtMVC.model.SearchResult', {
  extend: 'Ext.data.Model',
  fields: [
  {
    name: 'uuid'
  },

  {
    name: 'msisdn',
    mapping:'result.msisdn'
  },

  {
    name: 'name',
    mapping:'result.name'
  }
  ],
  statics: {
    getStore: function() {
      var api = 'clientCardApi.findSubscribers';
      var config = getStoreConfig(this.modelName, api, {
        autoLoad: false
      });
      config.proxy.paramOrder = 'param1';
  /*    config.proxy.extraParams = {
        'param1':formValues
      };
*/
      return getStore(this.modelName + api, config);
    }
  }
});
