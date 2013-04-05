Ext.Loader.setConfig({
  enabled: true
});

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

    var href = window.location['pathname'].split(/\/+/g);
    var pagename = href[3];

    // check custom Viewport
    var customViewport = '';
    if(pagename == 'client.html') {
      customViewport = 'ClientCard';
    }
    // set active Viewport
    var activeViewport = Ext.create("ExtMVC.view." + (customViewport?customViewport:'Viewport'));

  }
});


Ext.onReady(function() {

  Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);


});
