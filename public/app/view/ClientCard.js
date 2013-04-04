Ext.define('ExtMVC.view.ClientCard', {

  extend: 'Ext.container.Viewport',
  requires: ['ExtMVC.view.clientcard.Toolbar'],
  uses: [
  //  'ExtMVC.view.app.PortalPanel'
  ],

  initComponent: function(){
    //console.log('initvieport ClientCard');

    //Ext.require([
    //  'Ext.FormPanel'
    //  ]);

    Ext.apply(this, {
      id: 'app-clientcard',
      //layout: {
      //type: 'auto',
      //padding: '0 5 5 5'
      // },
      items: [{
        xtype :'ClientCardToolbar'
      }]
    });
    this.callParent(arguments);
  }
});
