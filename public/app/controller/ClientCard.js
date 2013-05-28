Ext.define('ExtMVC.controller.ClientCard', {
  extend: 'Ext.app.Controller',
  stores: ['ClientInfoStore'],
  //models: ['Stock', 'ChartStock'],
  views: [
  'clientcard.Toolbar',
  'clientcard.ClientData',
  'clientcard.win.Subscribers','clientcard.win.Notes'
  ],

  refs: [
  {
    ref: 'toolbar',
    selector: 'client-toolbar'
  },
  {
    ref: 'clientdata',
    selector: 'ClientCardData'
  },
  {
    ref: 'winSubscribers',
    selector: 'win.Subscribers'
  },
  {
    ref: 'winNotes',
    selector: 'win.Notes'
  }
  ],

  init: function() {
    console.log('init ClientCard controller');
    //var pageUuid = ExtMVC.util.Common.getQueryParam('pageUuid');


    this.control({
      'toolbar': {
        openSubscribers: this.openSubscribersWindow,
        openNotes: this.openNotesWindow,
        openUpsales: this.openUpsalesWindow
      },
      'ClientCardData':{
        beforerender: this.loadClientData
      }

    });
  },

  loadClientData:function(){

    var store = ExtMVC.model.ClientInfo.getClientStore();
    //clientInfoStore.getProxy().setExtraParam('pageUuid', pageUuid);
    store.load({
      'params':getQueryParam('pageUuid'),
      callback: function(records, operation, success) {
        var client = records[0].raw;

        Ext.getDom('headerAccountNumber').innerHTML = outString(client.accountNumber);
        Ext.getDom('headerClientType').innerHTML = outString(client.type.name);
        Ext.getDom('headerClientStatus').innerHTML = outString(client.status.name);
        Ext.getDom('headerStatusChangeReason').innerHTML = 'todo';
        Ext.getDom('headerClientCodeWord').innerHTML = outString(client.customAttrValues.clientSecret);
        Ext.getDom('headerClientCeo').innerHTML = outString(client.customAttrValues.ceoData);
        Ext.getDom('headerClientAgreement').innerHTML = (client.customAttrValues.isNotAgreePersonalDataUsage == '0' ? 'ДА' : 'НЕТ');
        Ext.getDom('headerAuthorizedDelegate').innerHTML = outString(client.customAttrValues.authorizedDelegate);
        Ext.getDom('headerClientTariff').innerHTML = outString(client.tariffPlanName);
        Ext.getDom('headerClientBonus').innerHTML = 'todo';
      }
    }
    );


    var store = ExtMVC.model.ClientInfo.getClientBalancesStore();
    store.load({
      'params':getQueryParam('pageUuid'),
      callback: function(records, operation, success) {
        var client = records[0].raw;

        console.log(client);
      }
    }
    );

  },

  //functions
  openSubscribersWindow:function(params) {

//check window existance
    var winID = 'widget.win-subscribers';
    var win = Ext.getCmp(winID);
    //create window
    if(!win) {
      var win = Ext.create(winID);
      win.show();
    }
    //show window
    if(!win.isVisible()) win.show();
    //set window position
    win.setPosition(params.x, params.y+30);

  },


  openNotesWindow:function(params) {

    //check window existance
    var winID = 'widget.win-notes';
    var win = Ext.getCmp(winID);
    //create window
    if(!win) {
      var win = Ext.create(winID);
      win.show();
    }
    //show window
    if(!win.isVisible()) win.show();
    //set window position
    win.setPosition(params.x, params.y+30);

  },
  
  openUpsalesWindow:function(params) {
    console.log('openUpsalesWindow');
  }

});


