Ext.define('ExtMVC.view.Viewport', {

    extend: 'Ext.container.Viewport',
    requires: ['ExtMVC.view.app.FormSearch','ExtMVC.view.app.SearchResult'],
    uses: [
      //  'ExtMVC.view.app.PortalPanel'
          ],

    initComponent: function(){

Ext.apply(this, {
            id: 'app-viewport',
            items: [{
                      xtype :'FormSearch',
                      title: 'Form',
                      height: 150,
                      width: 350
                  },{
                      xtype:'SearchResult',
                      title: 'Search result',
                      width: 350
                  }]
        });
        this.callParent(arguments);
    }
});
