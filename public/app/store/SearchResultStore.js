Ext.define('ExtMVC.store.SearchResultStore', {
  extend: 'Ext.data.Store',
  model: 'ExtMVC.model.SearchResult',
  autoLoad: false,
  storeId: 'SearchResultStore',
  proxy: {
    type: 'direct',
    directFn: clientCardApi.getLastSearchResults,
    listeners: {
      exception: function(proxy, response, operation, eOpts ) {
        // a timed-out session usually results in a response.status == 401
        Ext.MessageBox.alert('Ошибка!', 'Ошибка загрузки данных');
        console.log('response: %1.o, operation: %.o, eOpts: %2.o', response, operation, eOpts);
      }
    }
  }
});