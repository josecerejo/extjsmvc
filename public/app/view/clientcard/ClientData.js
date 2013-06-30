Ext.define('ExtMVC.view.clientcard.ClientData', {
  extend: 'Ext.Panel',
  alias: 'widget.ClientCardData',
  id: 'clientDataPanel',
  title: 'Данные клиента и абонента',
  requires: [
  'ExtMVC.view.clientcard.ClientDataB2B',
  'ExtMVC.view.clientcard.ClientDataB2C'
  ],
  defaults: {
    bodyStyle: 'border: none;',
    width:'100%'
  },
  kind:'',

  initComponent: function() {

    var cmp = this;

    Ext.apply(cmp, {
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp)
      //  clientloaded: cmp.onClientloaded.bind(cmp)
      }
    });
    this.callParent(arguments);

  },

  onAfterrender: function(){
    this.addClientDataPanel();
  },

  addClientDataPanel: function(){

    //select form panel
    var kind = ExtMVC.util.Client.client.kind;
    var type = (kind=='PRIVATE')? 'B2C':'B2B';
    _d('view clientdataloaded '+type);
    var form = Ext.create('ExtMVC.view.clientcard.ClientData'+type);
    this.add(form);
    this.doLayout();
  },

  onClientloaded: function(Client){
    _d('view onClientloaded');


    //select form panel
  //  var type = (kind=='PRIVATE')? 'B2C':'B2B';
  //  var clentdatapanel = Ext.getCmp('clientcard'+type);
  //  _d(clentdatapanel);
  //  clentdatapanel.doSetValues(obj, name);
  }

});


