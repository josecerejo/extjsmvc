Ext.ns('Core');

Ext.define('ExtMVC.controller.ClientCard', {
  extend: 'Ext.app.Controller',
  //stores: ['SearchResultStore'],
  //models: ['Stock', 'ChartStock'],
  views: ['clientcard.Toolbar'],

  refs: [
  {
    ref: 'toolbar',
    selector: 'ClientCardToolbar'
  }
  ],

  init: function() {
    console.log('init ClientCard controller');

    var pageUuid = this.getQueryParam('pageUuid');
 console.log(pageUuid);

    this.control({
      'toolbar': {
        openSubscribers: this.openSubscribersWindow,
        openConversation: this.openConversationWindow,
        openUpsales: this.openUpsalesWindow
      }
    });
  },


getQueryParam: function (name){
		   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		      return decodeURIComponent(name[1]);
 },


  //functions
  openSubscribersWindow:function(params) {
    console.log('openSubscribersWindow');
    console.log(params);

  //if (!subscribersWindow) {
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
  },
   openConversationWindow:function(params) {
    console.log('openConversationWindow');
  },
   openUpsalesWindow:function(params) {
    console.log('openUpsalesWindow');
  }

});


