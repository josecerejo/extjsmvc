Ext.define('ExtMVC.view.clientcard.win.NotesTemplate', {
  extend: 'Ext.window.Window',
  // requires: [  ],
  id : 'win-notes-template',
  alias : 'widget.win-notes-template',
  title : 'Шаблон заметки',
  align : 'right',
  closable: true,
  closeAction: 'destroy',
  width: 350,
  minWidth: 350,
  height: 250,
  layout: 'fit',
  modal:true,
  Form:null,
  NotesRecord:null,

  initComponent: function() {

    var cmp = this;


    var regionData = [
    [0,'Шаблон #1'],
    [1,'Шаблон #2'],
    [3,'Шаблон #3']
    ];
    var tplStore = Ext.create('Ext.data.ArrayStore', {
      fields: [{
        name: 'id'
      },{
        name: 'name'
      }],
      data: regionData,
      autoLoad: true
    });



    this.Form = Ext.create('Ext.form.Panel', {
      frame: true,
      border:false,
      layout: 'vbox',

      defaults: {
        border: false,
        width:'100%',
        layout: 'hbox',
        bodyPadding:'padding:5px',
        margin:'0px 5px 0px 5px'
      },
      items: [{
        xtype:'combobox',
        id: 'tpltypecombo',
        name:'tpltypecombo',
        emptyText:'Выберите шаблон комментария',
        store: tplStore,
        displayField:'name',
        valueField:'id',
        queryMode:'local',
        //typeAhead:true,
        //lazyRender:true,
        //forceSelection:false,
        minChars:0,
        valueNotFoundText:false,
        editable:false,
        // allowBlank: false,
        // forceSelection: true,
        height: 35
      },
      {
        items: [
        {
          xtype:'component',
          flex: 1
        },
        {
          xtype:'button',
          text:'!',
          width: 30,
          icon: '../resources/images/icons/important.png',
          align: 'right',
          margin:'0px 5px',
          enableToggle:true,
          toggleHandler: function(btn, pressed){
            cmp.Form.getForm().setValues({
              important: pressed
            });
          }
        },
        {
          xtype:'button',
          text:'SMS',
          width: 60,
          icon: '../resources/images/icons/tick.png',
          align: 'right',
          enableToggle:true,
          toggleHandler: function(btn, pressed){
            cmp.Form.getForm().setValues({
              sms: pressed
            });
          }
        }
        ]
      },
      {
        xtype: 'hiddenfield',
        name:  'important',
        value: false
      },
      {
        xtype: 'hiddenfield',
        name:  'sms',
        value: false
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
      ]
    });


    Ext.apply(this,{
      items: this.Form,
      buttons: [
      {
        text: 'Отмена',
        handler: cmp.onCancel.bind(cmp)
      },
      {
        xtype:'displayfield', //'component'
        flex: 1
      },
      {
        text: 'OK',
        //id: save_button_id,
        formBind : true,
        handler: cmp.onSave.bind(cmp)
      }
      ]
    });

    this.callParent(arguments);
  },

onCancel: function() {
    var cmp = this;

    var NotesGrid  = Ext.getCmp('win-notes-tree');
    NotesGrid.onUnCheck(this.NotesRecord.id);

    cmp.close();
    },

  onSave: function(){
    var cmp = this;

    var FormParams = this.Form.getForm().getValues();
    FormParams.id = this.NotesRecord.id;
    FormParams.cat = this.NotesRecord.name;
    FormParams.name = this.NotesRecord.cat;

    //insert note row in NoteGrid
    var item = {
      id: this.NotesRecord.id,
      name: this.NotesRecord.name,
      cat: this.NotesRecord.cat,
      comment: FormParams.comment,
      important: FormParams.important,
      sms: FormParams.sms
    };

    this.fireEvent('doNotesAdd', item);

    cmp.close();
  }

});
