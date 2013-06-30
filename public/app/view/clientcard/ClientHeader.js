Ext.define('ExtMVC.view.clientcard.ClientHeader', {
  extend: 'Ext.form.Panel',
  alias: 'widget.ClientCardHeader',
      id: 'clientHeader',
      //title: 'Данные клиента и абонента',
      //renderTo: document.body,
      height: 30,
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
  pageUuid:null,

  initComponent: function() {

    var cmp = this;
    cmp.pageUuid = getQueryParam('pageUuid');

    Core.app.on({
        clientloaded: cmp.onClientloaded,
        scope: cmp
    });

    Ext.apply(this, {
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp)
       },
      defaults: {
        bodyStyle: 'padding: 5px;',
        xtype:'displayfield'
      },
      items: [{
          name:'client.name',
          cls:'account-logo txt-header',
          padding: '5px 5px 5px 30px',
          flex:1,
          value:'-',
          id: "client-header-name"
          },
        {
          value:'Авторизация',
          width:100
          },
        {
          name: 'client.pstnNumber',
          cls:'txt-header',
          padding: '5px',
          id:'client-header-phone',
          value:'-',
          width:150
          },
        {
          name:'client.status.name',
          flex:1,
          padding: '5px',
          id:'client-header-status',
          value:'-'
          }
        ]
    });


    this.callParent(arguments);
  },


onAfterrender: function(){
   this.doApply();
},
onClientloaded: function(Client){
    this.doApply();
    //this.applyIfToFields();
  },

doApply: function(){

  var Client = ExtMVC.util.Client;
  _d('clientheader doApply '+Client.client.name);
  setComponentValues(this.getForm(), Client.client,'client');
}

});
