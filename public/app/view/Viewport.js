Ext.define('ExtMVC.view.Viewport', {
  extend: 'Ext.container.Viewport',
  alias: 'app.viewport',
  requires: ['ExtMVC.view.app.Toolbar','ExtMVC.view.app.ContentPanel'],
  id: 'MainViewport',
  page:'',
  autoWidth: true,
  autoHeight: true,
  items: [
  {
    xtype :'top-toolbar'
  },
  {
    xtype:'ContentPanel'
  }],

  initComponent: function(){
    var cmp = this;

    Ext.apply(cmp);
    this.callParent(arguments);
  }
});
