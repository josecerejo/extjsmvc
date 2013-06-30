Ext.define('ExtMVC.view.app.FormSearch', {
  extend: 'Ext.form.Panel',
  alias: 'widget.FormSearch',
  id: 'abon-search-form',
  //labelWidth: 130,
  frame: true,
  title: 'Поиск абонента',
  bodyStyle:'padding:5px 5px 0',
  width: 300,
  collapsible: true,
  defaults: {
    xtype: 'textfield',
    width: '95%',
    labelAlign: 'top',
    msgTarget: 'side'
  },

  initComponent: function() {

    var cmp = this;

    var regionData = [
    [0,'Адыгея республика'],
    [1,'Амурская область'],
    [3,'Алтай республика']
    ];
    var regionStore = Ext.create('Ext.data.ArrayStore', {
      fields: [{
        name: 'id'
      },{
        name: 'name'
      }],
      data: regionData,
      autoLoad: false
    });

    var region = Ext.create('Ext.form.ComboBox', {
      id: 'regioncombo',
      name:'regioncombo',
      fieldLabel:'Регион',
      store: regionStore,
      displayField:'name',
      valueField:'id',
      queryMode:'local',
      //typeAhead:true,
      lazyRender:true,
      //forceSelection:false,
      minChars:0,
      valueNotFoundText:false,
      editable:false,
      allowBlank: false,
      forceSelection: true,
      labelAlign: 'top',
      width: 230
    });
    region.store.getAt(0);


    Ext.apply(this, {
      items: [
      region,
      {
        fieldLabel: 'MSISDN',
        id: 'msisdn',
        name: 'msisdn',
        value: '',
        maxLength: 10,
        minLength: 10,
        emptyText:'1111111111'
      }, {
        fieldLabel: 'Городской номер',
        id: 'cityphone',
        name: 'cityphone',
        value: '',
        maxLength: 10,
        minLength: 5
      }, {
        fieldLabel: 'ICC',
        id: 'icc',
        name: 'icc',
        value: '',
        maxLength: 20,
        minLength: 20,
        emptyText:'20'
      }, {
        xtype: 'checkboxfield',
        boxLabel  : 'Искать среди бывших владельцев MSISDN городского номера или ICC',
        name      : 'icccheckbox',
        inputValue: '1',
        id        : 'icccheckbox'
      },
      {
        fieldLabel: 'Номер лицевого счета',
        id: 'idpersonalaccount',
        name: 'idpersonalaccount',
        allowBlank:true,
        value: '',
        maxLength: 10,
        minLength: 5
      },
      {
        fieldLabel: 'Номер выставленного счета',
        id: 'idinvoicepayment',
        name: 'idinvoicepayment',
        allowBlank:true,
        value: '',
        maxLength: 25,
        minLength: 5
      }, {
        fieldLabel: 'Номер счета-фактуры',
        id: 'idCard',
        name: 'idCard',
        allowBlank:false,
        value: '',
        maxLength: 25,
        minLength: 5,
        emptyText:'111111'
      },
       {
        fieldLabel: 'Номер заявки или тикета',
        id: 'idticket',
        name: 'idticket',
        value: '',
        maxLength: 20,
        minLength: 5
      }, {
        fieldLabel: 'ФИО',
        id: 'fio',
        name: 'fio',
        value: '',
        maxLength: 20,
        minLength: 5
      }, {
        fieldLabel: 'Паспортные данные',
        id: 'passport',
        name: 'passport',
        value: '',
        maxLength: 20,
        minLength: 5
      }
      ],

      buttons: [
      {
        text: 'Найти',
        name: 'button-search',
        type: 'submit',
        handler: function() {
          var formValues = cmp.getForm().getValues();
          cmp.fireEvent('search', formValues);
        }
      }
      /*,{
        text: 'Отмена',
        handler: function(){
          component.fireEvent('cancel');
        }
      }*/
      ]
    });

    this.callParent(arguments);
  }
});
