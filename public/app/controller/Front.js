Ext.define('ExtMVC.controller.Front', {
  extend: 'Ext.app.Controller',
  stores: ['SearchResultStore','SearchClient'],//TODO нужно убрать отсюда это чтоб не делался запрос каждый раз
  //models: ['Stock', 'ChartStock'],
  views: [
  'app.FormSearch',
  'app.SearchResult',
  'app.Toolbar',
  'app.win.Search'
  ],
  refs: [
  {
    ref: 'toolbar',
    selector: 'top-toolbar'
  },
  {
    ref: 'grid',
    selector: 'SearchResult'
  },{
    ref: 'form',
    selector: 'FormSearch'
  },
  {
    ref: 'winSearch',
    selector: 'win-search'
  }
  ],
  init: function() {
    console.log('init Front controller');
    //console.log(ExtMVC.util.Common.getText());


    this.control({
      'toolbar': {
        dobtnsearch: this.doBtnSearch,
        dobtnhistory: this.doBtnHistory
      },
      'form': {
        search: this.doFormSearch,
        cancel: this.doFormCancel
      },
      'grid': {
        openclient: this.doOpenClientCard
      }
    });
  },

  doFormCancel: function(params) {
    //resultsStore.loadData([],false);
    this.getGrid().getStore().removeAll();
    // hide results grid
    this.getWinSearch().setWidth(300);

  },
  doFormSearch: function(params) {
    if (!Ext.isEmpty(params)) {

 /*
      billingApiWrapper.findClientByMsisdnAndIdentityCardNumber(params.msisdn, params.idCard, function(result) {
        //alert('result: ' + JSON.stringify(result));

        console.log(result);
    });
*/
       // var store = this.getGrid().getStore();
        //store.removeAll();


      //Ext.Msg.alert('Результат поиска', 'Абонент найден: ' + result.name);
       //   store.insert(0, result);
      //  while (store.count() > 10) {
      //    store.removeAt(store.count()-1);
      //}
       //this.getGrid().getSelectionModel().selectRange(0,0, false);
     // });

   //var msisdn = Ext.getCmp('msisdn').getValue();

    var store = Ext.data.StoreManager.lookup('SearchClient');
    store.getProxy().setExtraParam('msisdn',params.msisdn);
    store.getProxy().setExtraParam('idCard',params.idCard);
    store.load({
      scope   : this,
      callback: function(records, operation, success) {
        //the operation object contains all of the details of the load operation
        console.log(records[0].data);

        var grid = Ext.widget('SearchResult');
        var win = Ext.getCmp('widget.win-search');

        //TODO insert rows to grid store
        //grid.getView().getStore().loadData(records[0].data);

        //grid.getStore().reload();
        //_d(grid.getStore());

      //if (grid.store.totalCount > 0){
        grid.setWidth(500);
        win.setWidth(800);

        this.doOpenClientCard('3U_yQKcxEeIAAEAs9LioApt3');
      //}
    }
  }
  );

    }
  },



  doBtnSearch: function(item) {

    //var pageUuid = getQueryParam('pageUuid');
    //check window existance
    var win = Ext.getCmp('widget.win-search');//Ext.getCmp('widget.win-search'); //
    //create window
    if(!win) {
      var win = Ext.create('widget.win-search', {
        x: item.x,
        y: item.y+30
      });
    }
    //show window
    if(!win.isVisible()) win.show();

  //console.log(win.isVisible());
  },

  doBtnHistory: function(item) {
    var params = [item.x, item.y + 30];
    console.log(item);
  },


  doOpenClientCard: function(uuid) {
    var url = 'client.html?pageUuid=' + encodeURIComponent(uuid);
    window.open(url, '_blank');
  }

});
