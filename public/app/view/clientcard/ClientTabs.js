Ext.define('ExtMVC.view.clientcard.ClientTabs', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.ClientCardTabs',

  initComponent: function() {

    var component = this;

    Ext.apply(this, {
	                // renderTo: document.body,
	                 activeTab: 0,
	                 //width: 600,
	                 height: '60%',
	                 plain: true,
	                 defaults :{
	                     autoScroll: true,
	                     bodyPadding: 10
	                 },
	                 items: [{
	                         title: 'Профиль',
	                         html: "Место для загрузки профиля абонента."
	                     },{
	                         title: 'Детализация.Платежи',
	                         id: 'paymentsTab',
	                         loader: {
	                             url: 'clientcard/payments',
	                             contentType: 'html',
	                             loadMask: true,
	                             scripts: true,
	                             //params: {pageUuid: encodeURIComponent(pageUuid)}
	                         },
	                         listeners: {
	                             activate: function(tab) {
	                               if (Ext.getDom('paymentsTabContent')) return; // hack to not reload if loaded
	                               tab.loader.load();
	                             }
	                         }
	                     },{
	                         title: 'Услуги',
	                         id: 'servicesTab',
	                         loader: {
	                             url: 'clientcard/services',
	                             contentType: 'html',
	                             loadMask: true,
	                             scripts: true,
	                             //params: {pageUuid: encodeURIComponent(pageUuid)}
	                         },
                           listeners: {
                               activate: function(tab) {
	                        	      if (Ext.getDom('servicesTabContent')) return; // hack to not reload if loaded
                                  tab.loader.load();
                               }
                           }
	                     },{
	                         title: 'Заявки',
	                         id: 'incidentsTab',
	                         loader: {
	                             url: 'clientcard/incidents',
	                             contentType: 'html',
	                             scripts: true,
	                            //params: {pageUuid: encodeURIComponent(pageUuid)}
	                         },
                           listeners: {
                               activate: function(tab) {
	                        	      //if (Ext.getDom('incidentsTabContent')) return; // hack to not reload if loaded
                                  tab.loader.load();
                               }
                           }
	                     },{
	                         title: 'История абонента',
	                         id: 'historyTab',
	                         loader: {
	                             url: 'clientcard/history',
	                             contentType: 'html',
	                             scripts: true,
	                             //params: {pageUuid: encodeURIComponent(pageUuid)}
	                         },
                           listeners: {
                               activate: function(tab) {
	                        	      if (Ext.getDom('historyTabContent')) return; // hack to not reload if loaded
                                  tab.loader.load();
                               }
                           }
	                     }
	                 ]
	             });

    this.callParent(arguments);
  }
});
