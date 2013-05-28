Ext.define('ExtMVC.view.clientcard.win.Subscribers', {
  extend: 'Ext.window.Window',
  uses: ['ExtMVC.util.Client'],
  id : 'widget.win-subscribers',
  alias : 'widget.win-subscribers',
  title : 'Список абонентов клиента',
  layout: 'fit',
  closable: true,
  closeAction: 'hide',
  width: 600,
  minWidth: 400,
  height: 400,
  initComponent: function() {

 var component = this;

//todo move this to controller
var pageUuid = getQueryParam('pageUuid');
var clientCard = Ext.create('ExtMVC.util.Client', {
    pageUuid: pageUuid,
    headerLoadMask: Ext.LoadMask(component, { msg: "Подождите, идет загрузка данных..." })
});
//clientCard.headerLoadMask = new Ext.LoadMask(component, { msg: "Подождите, идет загрузка данных..." });


var subscribersStore = new Ext.data.ArrayStore({
          fields: [{ name: 'id', mapping: 'id.localId' }, 'msisdn', 'name'],
          idIndex: 0,
          autoLoad: true,
          proxy: {
            type: 'direct',
            directFn: clientCardApi.getSubscribers,
            paramOrder: 'pageUuid,nameTemplate,msisdnTemplate',
            extraParams: { pageUuid: pageUuid }
          },
          listeners: {
        	    // для работы paging нужно автоматически передавать доп. параметры без указания в load()
              beforeload: function() {
                this.getProxy().setExtraParam('msisdnTemplate', Ext.getCmp('subscrMsisdnTemplate').getValue());
                this.getProxy().setExtraParam('nameTemplate',   Ext.getCmp('subscrNameTemplate').getValue());
              },
              load: function(store, records, successful, eOpts) {
                var selected = store.findExact('id', clientCard.selectedSubscriberId);
                //alert ('selected=' + selected);
                if (selected >= 0) {
                	resultsGrid.getSelectionModel().select(selected, false, true); // suppressEvent=true
                }
              }
            }
      });

      var item = new Ext.grid.GridPanel({
 	     title: 'Абоненты',
 	     //width: '98%',
 	    height: '100%',
      store: subscribersStore,
      //renderTo: Ext.getDom('subscribersWinContent'),
      columns: [
        {header: '',       dataIndex: 'id',     id: 'openCol',   width: 50,  menuDisabled: true},
        {header: 'MSISDN', dataIndex: 'msisdn', id: 'msisdnCol', width: 100, menuDisabled: true},
        {header: 'ФИО',    dataIndex: 'name',   id: 'nameCol',   width: 200, menuDisabled: true}
      ],
      defaultSortable: false,
      listeners: {
          selectionchange: function(selmodel, selected, eOpts) {
          if (selected && selected.length) {
            //alert('selected=' + selected[0].get('id'));
            clientCard.selectAndLoadSubscriber(selected[0].get('id'));
            clientCard.loadSelectedSubscriberBalancesInfo();
          }
          return true;
        }
      },
      tbar: [{
      	      xtype: 'textfield',
              fieldLabel: 'MSISDN',
              id: 'subscrMsisdnTemplate',
              width: 150,
              labelWidth: 50,
              allowBlank: true,
              value: ''
          },{
    	        xtype: 'textfield',
              fieldLabel: 'ФИО',
              id: 'subscrNameTemplate',
              width: 200,
              labelWidth: 50,
              allowBlank: true,
              value: ''
          },{
          	  xtype: 'button',
              text: 'Искать',
              //type: 'submit',
              handler: function() {
        	      subscribersStore.load();
           }
      }]
    });



    Ext.apply(this,{
      items: [item]
    });

  this.callParent(arguments);
  }
});
/*
{
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
				             }

                     */