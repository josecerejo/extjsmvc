Ext.define('ExtMVC.view.clientcard.win.NotesForm', {
  extend: 'Ext.form.Panel',
  uses:['ExtMVC.model.ClientInfo'],
  title:'Зарегистрированные заметки',
  id : 'win-notes-form',
  alias : 'widget.win-notes-form',

  minHeight: 90,
  layout: 'vbox',
  defaults: {
    border: false,
    xtype: 'panel',
    width:'100%',
    height:30,
    layout: 'hbox',
    bodyPadding:'padding:2px 5px 0px 5px'
  },

  initComponent: function() {

    var cmp = this;
    //cmp.store = ExtMVC.model.ClientInfo.getClientStore();


    Ext.apply(this, {
      items: [{
        xtype: 'label',
        html: '<h class="txt-header">Абонент +7 952 789456</h>',
        padding:5
      },
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
          align: 'right',
          handler: function(){

            var treeGrid = Ext.getCmp('win-notes-tree');
            _d(treeGrid);
            treeGrid.reloadTree();
          }
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
      }]
    });

    this.callParent(arguments);
  }



});







