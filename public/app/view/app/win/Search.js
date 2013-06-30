Ext.define('ExtMVC.view.app.win.Search', {
  extend: 'Ext.window.Window',
  alias : 'widget.win-search',
  id:'win-search',
  title : 'Список абонентов клиента',
  layout: {
    type: 'hbox',
    pack: 'start',
    align: 'stretch'
  },
  width:300,
  minWidth: 300,
  height: '90%',
  closeAction: 'hide',
  closable :true,

  initComponent: function() {

    var cmp = this;

    //var form = Ext.create('ExtMVC.view.app.FormSearch');
    //var grid = Ext.create('ExtMVC.view.app.SearchResult');
    Ext.apply(this, {
      items: [{
        xtype :'FormSearch'
      },
      {
        xtype :'SearchResult'
      }]
    });

    this.callParent(arguments);
  }
});