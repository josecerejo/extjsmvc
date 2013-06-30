//TODO: убрать обяявления store из контроллеров а то они выполняются на всех станицах

Ext.ns('ExtMVC');
Ext.ns('Core');

Core.startApplication = function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.Loader.setPath('Ext', '../resources/js');
  Ext.Loader.setPath('Ext.ux', '../resources/js/ux');



  Ext.application({
    name: 'ExtMVC',
    appFolder: '../action/app',

    controllers: [
    'Front','ClientCard'
    ],
    uses: ['ExtMVC.util.Client'],
    //common requires
    requires: [
    'Ext.layout.container.*',
    'Ext.Msg',
    'Ext.direct.*',
    'Ext.data.*',
    'Ext.grid.*',
    'ExtMVC.util.Common'
    ],

    //automatically load and instantiate AppName.view.Viewport before firing the launch function.
    autoCreateViewport: true,

    launch: function() {

      var href = window.location['pathname'].split(/\/+/g);
      var pagename = href[3];

      // check custom Viewport
      var customViewport = '';
      //if(pagename == 'client.html') {
      // customViewport = 'ClientCard';
      //}
      // set active Viewport
      var viewport_name = customViewport?customViewport:'Viewport';
     // var activeViewport = Ext.create("ExtMVC.view." + viewport_name,{
      //  page:window.PAGENAME
     // });

      this.viewport = Ext.ComponentQuery.query('viewport')[0];
      //this.viewport =  activeViewport;
      this.pagename = window.PAGENAME;
      Core.app = this;

     var controllername = (this.pagename=='clientcard')?'ClientCard':'Front';
     var controller = this.getController(controllername);
     controller.init(this);
     controller['actionIndex']();

     //Ext.ComponentQuery.query('viewport')[0];
    },

    setMainView:function(item){
      _d('setMainView');
      //this.viewport.removeAll(); // if you want to remove all the items
      this.viewport.add(item);
    }

  });

}



Ext.onReady(function() {
  Core.startApplication();
  Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);


});

