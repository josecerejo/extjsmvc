Ext.define('ExtMVC.store.SearchClient', {
  extend: 'Ext.data.Store',
  //model: 'ExtMVC.model.SearchResult',
    fields: [
  { name: 'id'},
  { name: 'name'},
  { name: 'accountNumber'}
  ],
  autoLoad: false,
  storeId: 'SearchClient',
  proxy: {
    type: 'direct',
    paramOrder: 'msisdn,idCard',
    directFn: billingApiWrapper.findClientByMsisdnAndIdentityCardNumber,
    listeners: {
      exception: function(proxy, response, operation, eOpts ) {
        // a timed-out session usually results in a response.status == 401
        Ext.MessageBox.alert('Ошибка!', 'Ошибка загрузки данных');
        console.log('response: %1.o, operation: %.o, eOpts: %2.o', response, operation, eOpts);
      }
    }
  }
});