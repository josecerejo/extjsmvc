Ext.define('ExtMVC.view.clientcard.ClientDataB2C', {
  extend: 'Ext.form.Panel',
  id:'clientcardB2C',
  alias: 'widget.clientcardB2C',
layout: {
        type: 'table',
        columns: 5,
        tableAttrs: {
          style: {
            width: '100%'
          }
        },
        tdAttrs: {
          style: {
            border: '1px solid #99BCE8',
            verticalAlign: 'top',
            width:'20%'
          }
        }
      },
  defaults: {
    bodyStyle: 'border: none;',
    width:'100%'
  },


  initComponent: function() {

    this.pageUuid = getQueryParam('pageUuid');
    var cmp = this;
    var blank = '-';


    var cell11 = Ext.create('Ext.Panel',{
      //frame: true,
      //title: 'Form Fields',
      width: '100%',
      bodyPadding: 1,

      fieldDefaults: {
        labelAlign: 'left',
        anchor: '100%'
      },
      defaults:{
        xtype: 'displayfield',
        width: '97%',
        padding:'0px 5px',
        labelWidth: '70px'
      },
      items: [{
        name: 'displayfield11',
        fieldLabel: 'Регион',
        value: blank

      },{
        name: 'client.accountNumber',
        id: 'accountNumber',
        fieldLabel: 'Л/С',
        value: blank
      },
      {
        name: 'client.type.name',
        id: 'type.name',
        fieldLabel: 'Тип',
        value: blank
      },
      {
        fieldLabel: 'Сегмент',
        value: blank
      }]
    });


    var cell13 = Ext.create('Ext.Panel',{
      //frame: true,
      title: 'Баланс клиента',
      width: '100%',
      bodyPadding: 1,

      fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 60,
        anchor: '100%'
      },
      defaults:{
        xtype: 'displayfield',
        width: '97%',
        padding:'0px 5px'
      },
      items: [{
        name: 'displayfield121',
        fieldLabel: 'Основной',
        value: blank
      },
      {
        name: 'displayfield121',
        fieldLabel: 'Админ',
        value: blank
      },{
        name: 'displayfield122',
        fieldLabel: 'Бонусный',
        value: blank
      },
      {
        name: 'displayfield123',
        fieldLabel: 'Сумма',
        value: blank
      },
      {
        name: 'textfield124',
        fieldLabel: 'Кредит',
        cls:'linklabel',
        value: blank
      }]
    });

    var cell14 = Ext.create('Ext.Panel',{
      colspan:2,
      cellCls:'w40',
      //frame: true,
      width: '100%',
      bodyPadding: 1,

      layout: {
        type: 'table',
        columns: 2,
        tableAttrs: {
          style: {
            width: '100%'
          }
        },
        tdAttrs: {
          style: {
            border: 'none',
            verticalAlign: 'top',
            width:'50%',
            padding:'2px'
          }
        }
      },
      defaults:{
        width:'100%',
        xtype: 'displayfield'
      },
      items: [
      {

        name: 'subscriber.name',
        fieldLabel: 'Абонент',
        value: blank
      },
      {
        name: 'subscriber._name_field2',
        //xtype: 'component',
        html: blank,
        cls:'dark'
      },
      {
        name: 'displayfield141',
        fieldLabel: 'КС абонента',
        cls:'linklabel',
        value: blank
      },
      {
        name:'subscriber.usi.puk',
        fieldLabel: 'PUK',
        value: blank
      },
      {
        name: 'subscriber.tariffPlanName',
        fieldLabel: 'ТП абонента',
        cls:'linklabel',
        value: blank
      },
      {

        name: 'subscriber.pstnNumber',
        fieldLabel: 'Гор. номер',
        cls:'linklabel',
        value: blank
      }
      ]
    });


    var items = [
    cell11
    ,
    {
      xtype: 'displayfield',
      name: 'displayfield2',
      fieldLabel: 'ТП клиента',
      value: blank,
      width:'97%',
      labelWidth:70,
      padding:'0px 5px'
    },
    cell13,
    cell14

    ];

    Core.app.on({
        clientloaded: cmp.onClientloaded,
        scope: cmp
    });


    Ext.apply(this, {
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp)
      },
      items: items
    });

    this.callParent(arguments);

},

  onClientloaded: function(Client){
    _d('b2c view onClientloaded');
    this.doApply();
    //this.applyIfToFields();
  },

onAfterrender: function(){
   this.doApply();
},

doApply: function(){
  _d('B2C onAfterrender');
   var Client = ExtMVC.util.Client; //Core.app.getController('ClientCard').Client;


  var subscriber = Client.subscriber;
  //get custom fields values
  var v = [subscriber.identityCard.type?outString(subscriber.identityCard.type.mnemo):'' ,subscriber.identityCard.series,subscriber.identityCard.number].join(' ');
  v += '<br />'+['выдан'+subscriber.identityCard.issuedOn,'кем',subscriber.identityCard.issuedBy].join(' ');

  //apply fields values
  var form = this.getForm();
  setComponentValues(form, Client.client, 'client');
  setComponentValues(form, subscriber, 'subscriber');
}


});



