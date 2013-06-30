Ext.define('ExtMVC.view.clientcard.win.Notes', {
  extend: 'Ext.window.Window',
  requires: [
  'ExtMVC.view.clientcard.win.NotesTree',
  'ExtMVC.view.clientcard.win.NotesGrid',
  'ExtMVC.view.clientcard.win.NotesForm',
  'ExtMVC.view.clientcard.win.NotesTemplate'
  ],
  id : 'widget.win-notes',
  alias : 'widget.win-notes',
  title : 'Заметки',
  layout: 'vbox',
  align : 'stretch',
  closable: true,
  closeAction: 'hide',
  width: 500,
  minWidth: 400,
  height: 550,
  defaults: {
    width:'100%'
  },
  items:null,
  initComponent: function() {

    var cmp = this;


    var NotesForm = Ext.create('ExtMVC.view.clientcard.win.NotesForm');
    var NotesTree = Ext.create('ExtMVC.view.clientcard.win.NotesTree');
    var NotesGrid = Ext.create('ExtMVC.view.clientcard.win.NotesGrid');

    Ext.apply(this,{
      items: [NotesForm, NotesTree, NotesGrid]
    });

    this.callParent(arguments);
  }


});
