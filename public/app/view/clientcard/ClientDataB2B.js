Ext.define('ExtMVC.view.clientcard.ClientDataB2B', {
  extend: 'Ext.form.Panel',
  id:'clientcardB2B',
  alias: 'widget.clientcardB2B',
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



    var cell21 = Ext.create('Ext.Panel',{
      //frame: true,
      width: '100%',
      bodyPadding: 1,

      fieldDefaults: {
        labelAlign: 'left',
        anchor: '100%'
      },
      defaults:{
        width: '97%',
        padding:'0px 5px',
        labelWidth: '60px'
      },

      items: [
      {
        xtype: 'displayfield',
        name: 'displayfield141',
        fieldLabel: 'Юр. тип',
        value: blank
      },
      {
        xtype: 'displayfield',
        name: 'displayfield141',
        fieldLabel: 'ОГРН',
        value: blank
      },
      {
        xtype: 'displayfield',
        name: 'displayfield141',
        fieldLabel: 'ИНН',
        value: blank
      }
      ]
    });

    var cell22 = Ext.create('Ext.Panel',{
      colspan:2,
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
        id: 'clientSecret',
        name: 'client.customAttrValues.clientSecret',
        fieldLabel: 'КС клиента',
        cls:'linklabel',
        value: blank
      },
      {
        xtype: 'component',
        html: blank,
        cls:'dark'
      },

      {
        id: 'ceoData',
        name: 'client.customAttrValues.ceoData',
        fieldLabel: 'Руководитель',
        value: blank
      },
      {
        xtype: 'component',
        html: blank,
        cls:'dark'
      },

      {
        id: 'authorizedDelegate',
        name: 'client.customAttrValues.authorizedDelegate',
        fieldLabel: 'Доверенный',
        value: blank
      },
      {
        xtype: 'component',
        html: blank,
        cls:'dark'
      }
      ]
    });

    var cell241 = Ext.create('Ext.Panel',{
      //frame: true,
      title: 'Баланс абонента',
      width: '100%',
      bodyPadding: 1,

      fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 60
      // anchor: '100%'
      },
      defaults:{
        width: '100%',
        xtype: 'displayfield'
      },
      items: [{
        name: 'balances.amount',
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
        name: 'displayfield124',
        fieldLabel: 'Сумма *105',
        cls:'linklabel',
        value: blank
      }]
    });


    var cell242 = Ext.create('Ext.Panel',{
      //frame: true,
      title: 'Квота',
      width: '100%',
      bodyPadding: 1,

      fieldDefaults: {
        labelAlign: 'left',
        labelWidth: 60
      // anchor: '100%'
      },
      defaults:{
        width: '100%',
        xtype: 'displayfield'
      },
      items: [
      {
        name: 'displayfield121',
        fieldLabel: 'Фильтр',
        value: blank
      },
      {
        name: 'displayfield123',
        fieldLabel: 'Сумма',
        value: blank
      },{
        name: 'displayfield122',
        fieldLabel: 'Остаток',
        value: blank
      }
      ]
    });


    var cell24 = Ext.create('Ext.Panel',{
      colspan:2,
      //frame: true,
      //width: '100%',
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
            border: '0px solid #99BCE8',
            verticalAlign: 'top',
            width:'40%'
          }
        }
      },
      defaults:{
        width:'50%'
      },
      items: [cell241, cell242]
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
    ,
    /*  row 2 */
    cell21,
    cell22,
    cell24
    ];


    Core.app.on({
        clientloaded: cmp.onClientloaded,
        scope: cmp
    });

    Ext.apply(this, {
      listeners: {
        afterrender: this.onAfterrender.bind(this)
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
  _d('B2B onAfterrender');
   var Client = ExtMVC.util.Client; //Core.app.getController('ClientCard').Client;


  var subscriber = Client.subscriber;
  var client = Client.client;

  //get custom fields values
  var v = [subscriber.identityCard.type?outString(subscriber.identityCard.type.mnemo):'', subscriber.identityCard.series,subscriber.identityCard.number].join(' ');
  v += '<br />'+['выдан'+subscriber.identityCard.issuedOn,'кем',subscriber.identityCard.issuedBy].join(' ');

  //apply fields values
  var form = this.getForm();
  setComponentValues(form, client, 'client');
  setComponentValues(form, subscriber, 'subscriber');
}


});

/*
  doSetValues: function(obj, name){

    //get custom fields values
    if (name == 'subscriber'){
      var v = [obj.identityCard.type.mnemo,obj.identityCard.series,obj.identityCard.number].join(' ');
      v += '<br />'+['выдан'+obj.identityCard.issuedOn,'кем',obj.identityCard.issuedBy].join(' ');
      obj._name_field2 = v;
    }

    var data = obj2array({}, obj, name);
    _d(data);
    this.getForm().setValues(data);
  }
*/
//     Ext.getDom('headerAccountNumber').innerHTML = outString(client.accountNumber);
//      Ext.getDom('headerClientType').innerHTML = outString(client.type.name);
//      Ext.getDom('headerClientStatus').innerHTML = outString(client.status.name);
//      Ext.getDom('headerStatusChangeReason').innerHTML = 'todo';
//      Ext.getDom('headerClientCodeWord').innerHTML = outString(client.customAttrValues.clientSecret);
//      Ext.getDom('headerClientCeo').innerHTML = outString(client.customAttrValues.ceoData);
//      Ext.getDom('headerClientAgreement').innerHTML = (client.customAttrValues.isNotAgreePersonalDataUsage == '0' ? 'ДА' : 'НЕТ');
//      Ext.getDom('headerAuthorizedDelegate').innerHTML = outString(client.customAttrValues.authorizedDelegate);
//      Ext.getDom('headerClientTariff').innerHTML = outString(client.tariffPlanName);
//      Ext.getDom('headerClientBonus').innerHTML = 'todo';