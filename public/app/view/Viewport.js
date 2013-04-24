Ext.define('ExtMVC.view.Viewport', {

  extend: 'Ext.container.Viewport',
  alias: 'app.viewport',
  page:'',
  requires: [
  'ExtMVC.view.app.Toolbar'
  ],
  uses: [
  //  'ExtMVC.view.app.PortalPanel'
  ],
  items: [
  {
    xtype :'top-toolbar'
  }],

  initComponent: function(){
    var component = this;

    //add client views
    if(component.page=='client.html') {
      //add client toolbar
      var clientToolbar = Ext.create('ExtMVC.view.clientcard.Toolbar');
      component.items.push(clientToolbar);
      //add client data
      var clientData = Ext.create('ExtMVC.view.clientcard.ClientData');
      component.items.push(clientData);
      //add client tabs
      var clientTabs = Ext.create('ExtMVC.view.clientcard.ClientTabs');
      component.items.push(clientTabs);
    }




    Ext.apply(component);
    this.callParent(arguments);
  }
});
