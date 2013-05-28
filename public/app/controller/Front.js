Ext.define('ExtMVC.controller.Front', {
  extend: 'Ext.app.Controller',
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
    var store = ExtMVC.model.SearchResult.getStoreSearch();
    store.getProxy().setExtraParam('msisdn',params.msisdn);
    store.getProxy().setExtraParam('idCard',params.idCard);
    store.load({
      scope   : this,
      callback: function(records, operation, success) {
             _d(records);
      }
   });
_d('end');


    var store = ExtMVC.model.SearchResult.getStore(); //Ext.data.StoreManager.lookup('SearchClient');
    store.getProxy().setExtraParam('msisdn',params.msisdn);
    store.getProxy().setExtraParam('idCard',params.idCard);
    store.load({
      scope   : this,
      callback: function(records, operation, success) {
        //the operation object contains all of the details of the load operation
        console.log('grid search');
        console.log(records);
        console.log(records);

        var grid = Ext.widget('SearchResult');
        var win = Ext.getCmp('widget.win-search');

        //TODO insert rows to grid store
        //grid.getView().getStore().loadData(records[0].data);
        //grid.getStore().reload();
        //_d(grid.getStore());

      //var countRows = grid.getStore().totalCount;
      //if (countRows > 0){
      //  grid.setWidth(500);
      //  win.setWidth(800);

       var countRows=2;
        if (countRows==1){
          this.doOpenClientCard('3U_yQKcxEeIAAEAs9LioApt3');
        }
    }
  }
  );

    }
  },



  doBtnSearch: function(item) {
    //var pageUuid = getQueryParam('pageUuid');
    //check window existance
    var win = Ext.getCmp('widget.win-search');
    //create window
    if(!win) {
      var win = Ext.create('widget.win-search');
    }

    //show window
    if(!win.isVisible()) {
      win.show();
    }
    //set window position
    win.setPosition(item.x, item.y+30);
  },

  doBtnHistory: function(item) {
    console.log(item);
  },


  doOpenClientCard: function(uuid) {
    var url = 'client.html?pageUuid=' + encodeURIComponent(uuid);
    window.open(url, '_blank');
  }

});
