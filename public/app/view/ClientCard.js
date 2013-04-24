Ext.define('ExtMVC.view.ClientCard', {

  extend: 'Ext.container.Viewport',
  requires: [
    'ExtMVC.view.app.Toolbar',
    'ExtMVC.view.clientcard.ClientData',
    'ExtMVC.view.clientcard.ClientTabs'],
  uses: [
  //  'ExtMVC.view.app.PortalPanel'
  ],

  initComponent: function(){

    Ext.apply(this, {
      id: 'app-clientcard',
      //layout: {
      //type: 'auto',
      //padding: '0 5 5 5'
      // },
      items: [{
        xtype :'ClientCardToolbar'
      },
      {
        xtype :'ClientCardData'
      },
      {
        xtype :'ClientCardTabs'
      }]
    });
    this.callParent(arguments);
  }
});
