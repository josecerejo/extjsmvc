Ext.define('ExtMVC.view.app.FormSearch', {
  extend: 'Ext.form.Panel',
  alias: 'widget.FormSearch',
  id: 'abon-search-form',
  //labelWidth: 130,
  frame: true,
  title: 'Поиск абонента',
  bodyStyle:'padding:5px 5px 0',
  //width: 300,
  defaults: {
    width: '95%',
    labelAlign: 'top',
    msgTarget: 'side'
  },
  defaultType: 'textfield',

  initComponent: function() {

    var component = this;

    var regionData = [
    [0,'Адыгея республика'],
    [1,'Амурская область'],
    [3,'Алтай республика']
    ];
    var regionStore = Ext.create('Ext.data.ArrayStore', {
      fields: [{name: 'id'},{name: 'name'}],
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
    region.getStore().getAt(0);


    Ext.apply(this, {
      items: [
      region,
      {
        fieldLabel: 'MSISDN',
        id: 'msisdn',
        name: 'msisdn',
        value: '1111111111',
        maxLength: 10,
        minLength: 10,
        emptyText:'9'
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
        allowBlank:false,
        value: '',
        maxLength: 10,
        minLength: 5
      },
      {
        fieldLabel: 'Номер выставленного счета',
        id: 'idinvoicepayment',
        name: 'idinvoicepayment',
        allowBlank:false,
        value: '',
        maxLength: 25,
        minLength: 5
      }, {
        fieldLabel: 'Номер счета-фактуры',
        id: 'idCard',
        name: 'idCard',
        allowBlank:false,
        value: '111111',
        maxLength: 25,
        minLength: 5
      },
      , {
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
      /*    {
  text:'run',
    id: 'runButton',
  handler:function(){
     //Ext.getCmp('inputForm').getForm().submit();
     var form = Ext.getCmp('abon-search-form').getForm();
     form.url = 'clientsearch/open';

     var el = Ext.getDom(Ext.getCmp('abon-search-form').getEl()); //form.getEl().dom;
     var target = document.createAttribute("target");
     target.nodeValue = "_blank";
     el.setAttributeNode(target);
     el.action = form.url;
     el.submit();
  }},
*/
      {
        text: 'Найти',
        name: 'button-search',
        type: 'submit',
        handler: function() {
          var params = component.getForm().getValues();
          component.fireEvent('search', params);
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
