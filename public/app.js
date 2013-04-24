//TODO: сделать автом генерацию store по модели чтобы не плодить много store а создавать их на лету
//TODO: убрать обяявления store из контроллеров а то они выполняются на всех станицах

Ext.ns('Core');

Core.startApplication = function() {
Ext.Loader.setConfig({
  enabled: true
});

Ext.Loader.setPath('Ext.ux', '../resources/js/ux');
Ext.require([
   'Ext.ux.tab.VerticalBar',
   'Ext.ux.CheckColumn'
]);



Ext.application({
  name: 'ExtMVC',
  appFolder: '../public/app',

  controllers: [
  'Front','ClientCard'
  ],
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
  //autoCreateViewport: true,

  launch: function() {
    Core.app = this;

    var href = window.location['pathname'].split(/\/+/g);
    var pagename = href[3];

    // check custom Viewport
    var customViewport = '';
    //if(pagename == 'client.html') {
     // customViewport = 'ClientCard';
    //}
    // set active Viewport
    var viewport_name = customViewport?customViewport:'Viewport';
    var activeViewport = Ext.create("ExtMVC.view." + viewport_name,{
      page:pagename
    });

    Core.app.viewport = activeViewport;
  }
});

}



Ext.onReady(function() {

  Core.startApplication();
  Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);


});

