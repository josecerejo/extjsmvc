Ext.define('ExtMVC.view.clientcard.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.ClientCardToolbar',

  initComponent: function() {

    var component = this;
   //console.log(tb);
    /*
    tb.items.add({
              xtype:   'button',
              text:    '2222222',
              tooltip: 'Указать данную организацию как оператора системы ЭДО без счёта'
              //handler: grid.setAsOperatorWithoutAccount.createDelegate(grid)
            });

*/
           // tb.suspendLayout = false;
	          //   tb.doLayout();
   //component.resumeLayouts(true);
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
                     component.fireEvent('openConversation', params);
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
