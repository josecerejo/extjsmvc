Ext.define('ExtMVC.view.clientcard.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.client-toolbar',

  initComponent: function() {

    var component = this;

   Ext.apply(this, {
        items:[
          {
	                 text:'Абоненты',
	                 handler: function(item, ev) {
                     var params = {'x':item.x, 'y':item.y + 30};
                     component.fireEvent('openSubscribers', params);
	                 }
	             },{
	                 text: 'Заметки',
	                 handler: function(item, ev) {
                     var params = [item.x, item.y + 30];
                     component.fireEvent('openNotes', params);
	                 }
	             },{
	                 text: 'Доп. продажи',
	                 handler: function(item, ev) {
                     var params = [item.x, item.y + 30];
                     component.fireEvent('openUpsales', params);
	                 }
	             },{
		             xtype: 'tbfill'
			         },{
	                 text: 'Операции',
	                 //iconCls: 'user',
	                 menu : {
                     items: [{
                         text: 'Операция 1'//,
                        // handler: onMenuOperation
                       }, {
                         text: 'Операция 2'//,
                        // handler: onMenuOperation
                       }, {
                         text: 'Операция 3'//,
                        // handler: onMenuOperation
                       }]
			              }
	             }]
      });

    this.callParent(arguments);
  }
});
