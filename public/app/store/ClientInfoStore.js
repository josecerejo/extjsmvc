Ext.define('ExtMVC.store.ClientInfoStore', {
  extend: 'Ext.data.Store',
  model: 'ExtMVC.model.ClientInfo',
  autoLoad: false,
  storeId: 'ClientInfoStore',
  proxy: {
    type: 'direct',
    directFn: clientCardApi.getClient,
    listeners: {
      exception: function(proxy, response, operation, eOpts ) {
        // a timed-out session usually results in a response.status == 401
        Ext.MessageBox.alert('Ошибка!', 'Ошибка загрузки данных');
        //_d('response: %1.o, operation: %.o, eOpts: %2.o', response, operation, eOpts);
      }
    }
  }
});