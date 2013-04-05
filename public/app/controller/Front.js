Ext.define('ExtMVC.controller.Front', {
  extend: 'Ext.app.Controller',
  stores: ['SearchResultStore'],
  //models: ['Stock', 'ChartStock'],
  views: ['app.FormSearch', 'app.SearchResult'],
  refs: [
  {
    ref: 'grid',
    selector: 'SearchResult'
  },{
    ref: 'form',
    selector: 'FormSearch'
  }
  ],
  init: function() {
    console.log('init Front controller');

    console.log(ExtMVC.util.Common.getText());

    this.control({
      'form': {
        search: this.doFormSearch
      },
      'grid': {
        openclient: this.doOpenClientCard
      }
    });
  },

  doFormSearch: function(params) {

    if (!Ext.isEmpty(params)) {
      //console.log(params);
      this.getGrid().getStore().reload();
    }
  },

  doOpenClientCard: function(item) {
    var resultUuid  = item.get('uuid');
    // console.log(params);
    var resultUuid  = item.get('uuid');
    var url = 'client.html?pageUuid=' + encodeURIComponent(resultUuid);
    window.open(url, '_blank');
  }

});
