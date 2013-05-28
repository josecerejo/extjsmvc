Ext.define('ExtMVC.view.clientcard.win.NotesTemplate', {
  extend: 'Ext.window.Window',
 // requires: [  ],
  id : 'widget.win-notes-template',
  alias : 'widget.win-notes-template',
  title : 'Шаблон заметки',
  layout: 'vbox',
  align : 'right',
  closable: true,
  closeAction: 'hide',
  width: 350,
  minWidth: 350,
  height: 250,
  layout: 'vbox',
  margin:5,
  modal:true,
  defaults: {
      border: false,
      xtype: 'panel',
      width:'100%',
      layout: 'hbox',
      bodyPadding:'padding:5px',
      margin:'0px 5px 0px 5px'
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
      emptyText:'Выберите шаблон комментария',
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
     // allowBlank: false,
     // forceSelection: true,
      height: 35
    });
    tpltype.getStore().getAt(0);



    Ext.apply(this,{

        items: [tpltype,
               {
              items: [
                 {
                xtype:'displayfield', //'component'
                flex: 1
                },
              {
                xtype:'button',
                text:'!',
                width: 30,
               // icon: '../resources/themes/images/default/grid/refresh.gif',
                align: 'right',
                margin:'0px 5px',
                enableToggle:true
                },
                {
                xtype:'button',
                text:'SMS',
                width: 60,
               // icon: '../resources/themes/images/default/grid/refresh.gif',
                align: 'right',
                enableToggle:true
                }
                ]
              },
              {
                  xtype     : 'textareafield',
                  fieldLabel:'Teкст комментария',
                  labelAlign :'top',
                  flex: 1,
                  grow:true,
                  name: 'comment',
                  margin:'0px 5px 5px 5px'
              }
  ],

      buttons: [
          {
          text: 'Отмена',
          handler: function() {
            cmp.hide();
          }
        },
        {
         xtype:'displayfield', //'component'
         flex: 1
        },
        {
          text: 'OK',
          scope: this,
          //id: save_button_id,
          formBind : true,
          handler: function() {
/*
            if (!component.dataForm.getForm().isValid()) {
              Ext.Msg.alert('Ошибка', 'Не все поля заполнены!');
              return;
            }
            var formParams = component.dataForm.getForm().getValues();
          */
          }
        }
      ]
    });

  this.callParent(arguments);
  }

});
