Ext.define('ExtMVC.view.clientcard.windowSubscribers', {
  extend: 'Ext.window.Window',
  alias : 'widget.windowSubscribers',
  title : 'Список абонентов клиента',
  layout: 'fit',
  closable: true,
  closeAction: 'hide',
  width: 600,
  minWidth: 400,
  height: 400,
  loader: {
    url: 'clientcard/subscribers',
    contentType: 'html',
    scripts: true,
    autoLoad: true,
    params: {'pageUuid':'123'}
  },
  initComponent: function() {
   // var name = 'pageUuid';
  //  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)){
	//	   var pageUuid =  decodeURIComponent(name[1]);
  //    }

   //this.loader.params.pageUuid = encodeURIComponent(pageUuid);
    //console.log(this.loader.params);

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