Ext.define('ExtMVC.model.ClientcardApi', {
  extend: 'Ext.data.Model',
  statics: {
    getSaveCase: function(pageUuid, convID, catID) {

      var config = getStoreConfig(this.modelName, 'clientCardApi.registerConversationCase', {
        autoLoad: true
      });
      config.proxy.paramOrder = 'pageUuid,convID,catID';
      config.proxy.extraParams = {'pageUuid':pageUuid,'convID':convID,'catID':catID};

     return getStore(this.modelName+'.getSaveCase', config);
    }
  }
});
