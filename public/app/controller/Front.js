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

   if (this.inited){
      return;
    }
    this.inited = true;

    _d('init Front controller');


    this.control({
      'toolbar': {
        openMainToolbar: this.openMainToolbar
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

  actionIndex: function(params) {
    _d('front actionIndex');
  },

  doFormCancel: function(params) {
    //resultsStore.loadData([],false);
    this.getGrid().getStore().removeAll();
    // hide results grid
    this.getWinSearch().setWidth(300);

  },
  doFormSearch: function(formValues) {
    _d('doFormSearch');
    if (!array_is_empty(formValues)){
      this.getGrid().doReload(formValues);
    }
  },


  doOpenClientCard: function(uuid) {
    //_d('doOpenClientCard ' + uuid);
    var url = 'clientcard?resultUuid=' + encodeURIComponent(uuid);
    window.open(url, '_blank');
  },


   openMainToolbar: function(item){

     item.y = item.y +30;

     switch(item.id){
      case 'Search':this.openSearch(item);
        break;

      default:
        _d('openMainToolbar: '+item.id+' callback not found!');
     }
   },

   openSearch: function(item) {
    //check window existance
    var win = Ext.getCmp('win-search');
    //create window
    if(!win) {
      var win = Ext.create('widget.win-search');
      //set window position IN 1 TIME ONLY
      win.setPosition(item.x, item.y);
    }

    //show window
    if(!win.isVisible()) {
      win.show();
    }

  }

});
