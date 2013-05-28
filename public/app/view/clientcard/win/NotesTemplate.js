Ext.define('ExtMVC.view.clientcard.win.NotesTemplate', {
  extend: 'Ext.window.Window',
 // requires: [  ],
  id : 'widget.win-notes-template',
  alias : 'widget.win-notes-template',
  title : 'Шаблон заметки',
  layout: 'vbox',
  align : 'stretch',
  closable: true,
  closeAction: 'hide',
  width: 300,
  minWidth: 300,
  height: 400,
  layout: 'vbox',
  defaults: {
      border: false,
      xtype: 'panel',
      width:'100%',
      height:30,
      layout: 'hbox',
      bodyPadding:'padding:2px 5px 0px 5px'
  },
  items:null,
  initComponent: function() {

   var cmp = this;

   var regionData = [
    [0,'Шаблон #1'],
    [1,'Шаблон #2'],
    [3,'Шаблон #3']
    ];
    var tplStore = Ext.create('Ext.data.ArrayStore', {
      fields: [{name: 'id'},{name: 'name'}],
      data: regionData,
      autoLoad: false
    });

    var tpltype = Ext.create('Ext.form.ComboBox', {
      id: 'tpltypecombo',
      name:'tpltypecombo',
      fieldLabel:'Шаблон комментария',
      store: tplStore,
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
    tpltype.getStore().getAt(0);



    Ext.apply(this,{
        items: [tpltype,
               {
              items: [
                {
                xtype:'checkboxfield',
                boxLabel: 'Регистрировать на всех',
                flex: 1,
                align: 'left'
                },{
                xtype:'button',
                width: 20,
                icon: '../resources/themes/images/default/grid/refresh.gif',
                align: 'right'
                }
                ]
              }, {
            items: [{
                xtype:'textfield',
                emptyText:'Введите название причины обращения',
                flex: 1,
                align: 'left',
                padding:'2 100 2 0'
            },{
                xtype:'button',
                text: 'Сбросить фильтры',
                width: 130,
                align: 'right'
            }]
        }],

      buttons: [
        {
          text: 'Сохранить',
          scope: this,
          //id: save_button_id,
          //formBind : true,
          handler: function() {
/*
            if (!component.dataForm.getForm().isValid()) {
              Ext.Msg.alert('Ошибка', 'Не все поля заполнены!');
              return;
            }
            var formParams = component.dataForm.getForm().getValues();
          */
          }
        },
        {
          text: 'Отменить',
          handler: function() {
            component.hide();
          }
        }
      ]
    });

  this.callParent(arguments);
  }

});
