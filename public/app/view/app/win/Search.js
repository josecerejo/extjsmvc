Ext.define('ExtMVC.view.app.win.Search', {
  extend: 'Ext.window.Window',
 /* requires: [
  'ExtMVC.view.app.FormSearch',
  'ExtMVC.view.app.SearchResult'
  ],
*/
  alias : 'widget.win-search',
  id:'widget.win-search',
  title : 'Список абонентов клиента',
  layout: {
   type: 'hbox',
    pack: 'start',
    align: 'stretch'
  },
 // collapsible: true,
 // split: true,
 // bodyStyle: 'padding:0px',
  width: 800,
  minWidth: 300,
  height: '90%',
  closeAction: 'hide',
  closable :true,
 // items:[
  initComponent: function() {

   component = this;
   //var form = Ext.create('ExtMVC.view.app.SearchResult');

   /*var grid = Ext.create('ExtMVC.view.app.SearchResult',{
     collapsible: true,
    region:'east',
    margins: '0 0 0 0',
    width:'70%'
   });
   */
   //grid.store = Ext.data.StoreManager.lookup('SearchResultStore');
   //grid.store.load();

   //_d(grid.store.totalCount);
   var currwidth = 600; //grid.store.totalCount>0? 600: 400;

  Ext.apply(this, {
      width:currwidth,

      items: [{
    xtype :'FormSearch',
    title: 'Form',
    region:'west',
    margins: '0 0 0 0',
    cmargins: '0 0 0 0',
    width: 300,
    collapsible: true
  },
{
    xtype :'SearchResult',
    collapsible: true,
    region:'east',
    margins: '0 0 0 0'
    //width:'70%'
  }
],
      listeners: {
          afterrender: function() {
             var grid = this.down('grid'); //Ext.getCmp('widget.SearchResult');
            //_d(grid.store.totalCount);
          
            if (grid.store.totalCount>0){
              this.down('grid').width =500;
              this.width = 800;
            }
            else {
               this.down('grid').width =0;
               this.width = 310;
            }

          }
        }
    });

    this.callParent(arguments);
  }
});