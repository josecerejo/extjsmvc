Ext.define('ExtMVC.view.app.FormSearch', {
  extend: 'Ext.form.Panel',
  alias: 'widget.FormSearch',

  initComponent: function() {

    var component = this;

    Ext.apply(this, {
      id: 'abon-search-form',
      labelWidth: 130,
      frame:true,
      title: 'Поиск абонента',
      bodyStyle:'padding:5px 5px 0',
      // width: 350,
      defaults: {
        width: 230
      },
      defaultType: 'textfield',

      items: [{
        fieldLabel: 'MSISDN (10 цифр)',
        name: 'msisdn',
        allowBlank:false,
        value: '1111111111',
        maxLength: 10,
        minLength: 10
      },{
        fieldLabel: 'Номер документа',
        name: 'idCard',
        allowBlank:false,
        value: '111111',
        maxLength: 25,
        minLength: 5
      }
      ],

      buttons: [
        {
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

        {
        text: 'Искать',
        name: 'button-search',
        type: 'submit',
        handler: function() {
          var params = component.getForm().getValues();
          component.fireEvent('search', params);

          //if (!form.isValid) {
          //  Ext.Msg.alert('Ошибка', 'Неверно заполнены поля поиска!');
         // }
        // TODO временный упрощенный способ перегрузить список результатов поиска
        // window.setTimeout(function() {
        //  resultsStore.load();
        //resultsGrid.loadResults();
        // }, 3000);

        }
      },{
        text: 'Отмена',
        handler: function(){
          resultsStore.loadData([],false);
        }
      }]
    });

    this.callParent(arguments);
  }
});
