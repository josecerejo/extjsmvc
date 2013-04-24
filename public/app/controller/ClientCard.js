Ext.define('ExtMVC.controller.ClientCard', {
  extend: 'Ext.app.Controller',
  stores: ['ClientInfoStore','ClientBalancesStore'],
  //models: ['Stock', 'ChartStock'],
  views: [
  'clientcard.Toolbar',
  'clientcard.ClientData',
  'clientcard.win.Subscribers','clientcard.win.Conversation'
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
    ref: 'winConversation',
    selector: 'win.Conversation'
  }
  ],

  init: function() {
    console.log('init ClientCard controller');
    //var pageUuid = ExtMVC.util.Common.getQueryParam('pageUuid');



    this.control({
      'toolbar': {
        openSubscribers: this.openSubscribersWindow,
        openConversation: this.openConversationWindow,
        openUpsales: this.openUpsalesWindow
      },
      'ClientCardData':{
        beforerender: this.loadClientData
      }

    });
  },

  loadClientData:function(){

    var clientInfoStore = Ext.data.StoreManager.lookup('ClientInfoStore');
    //clientInfoStore.getProxy().setExtraParam('pageUuid', pageUuid);
    clientInfoStore.load({
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



      var Store = Ext.data.StoreManager.lookup('ClientBalancesStore');
      Store.load({
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
    //console.log(params);
    //console.log(this.getQueryParam('pageUuid'));
    //this.getWinSubscribers.show();
   // var pageUuid = getQueryParam('pageUuid');
/*
    var win = Ext.create('widget.window', {
      title: 'Список абонентов клиента',
      closable: true,
      closeAction: 'hide',
      width: 600,
      minWidth: 400,
      height: 400,
      x: params.x,
      y: params.y,
      //layout: { type: 'fit', padding: 5 },
     items: {  // Let's put an empty grid in just to illustrate fit layout
        xtype: 'grid',
        border: false,
        columns: [{header: 'World'}],                 // One header just for show. There's no data,
        store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
    }
    });
    win.show();
*/
     var win = Ext.create('widget.win-subscribers');
    win.x = params.x;
    win.y = params.y;
    //win.loader.params.pageUuid = encodeURIComponent(pageUuid);
    win.show();

  /*if (!subscribersWindow) {
				        	 subscribersWindow = Ext.create('widget.window', {
				                 title: 'Список абонентов клиента',
				                 closable: true,
				                 closeAction: 'hide',
				                 width: 600,
				                 minWidth: 400,
				                 height: 400,
				                 x: params.x,
				                 y: params.y,
				                 //layout: { type: 'fit', padding: 5 },
				                 loader: {
	                         url: 'clientcard/subscribers',
	                         contentType: 'html',
	                         scripts: true,
	                         autoLoad: true,
	                         params: {pageUuid: encodeURIComponent(this.pageUuid)}
		                     }
				             });
					      // }
					       if (conversationWindow && conversationWindow.isVisible()) { conversationWindow.close(); }
					       if (upsalesWindow && upsalesWindow.isVisible()) { upsalesWindow.close(); }
					       if (subscribersWindow.isVisible()) {
					    	   subscribersWindow.close();
						     } else {
						    	 subscribersWindow.show();
					       }
                 */
  },
  openConversationWindow:function(params) {
    console.log('openConversationWindow');

    var win = Ext.create('widget.win-conversation');
    win.x = params.x;
    win.y = params.y;
    win.show();

  },
  openUpsalesWindow:function(params) {
    console.log('openUpsalesWindow');
  }

});


