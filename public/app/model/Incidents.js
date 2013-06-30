Ext.define('ExtMVC.model.Incidents', {
  extend: 'Ext.data.Model',
 fields:['id','isManualCaseRegistrationAllowed','mnemo','name','shortName','type'],
  statics: {
    getCategoriesStore: function() {

      var config = getStoreConfig(this.modelName, 'incidentsApi.getCategories', {
        autoLoad: true
      });
      config.proxy.paramOrder = 'type';
      config.proxy.extraParams = {'type':'GENERIC'};

     return getStore(this.modelName+'.getCategoriesStore', config);
    }
  }
});
