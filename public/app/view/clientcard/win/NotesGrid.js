Ext.define('ExtMVC.view.clientcard.win.NotesGrid', {
  extend: 'Ext.grid.Panel',
  uses:['ExtMVC.model.NotesGrid'],
  title:'Зарегистрированные заметки',
  height:150,
  id : 'win-notes-grid',
  alias : 'widget.win-notes-grid',
  hideHeaders: false,
  hidden:true,
  flex:1,
  defaults:{
     sortable:false
  },

    initComponent: function() {

     var cmp = this;
     cmp.store = ExtMVC.model.NotesGrid.getStore();


    Ext.apply(this, {
      columns: [
     {
          width     : 50,
          dataIndex: 'id',
          hidden: false
      },
      {
          dataIndex: 'name',
          text:'Причина обращения',
          flex : 1
      },
        {
          dataIndex: 'cat',
          text:'Категория',
          width    :100
      },
     {
          dataIndex: 'comment',
          text:'Комментарий',
          width    :150
      },
    { xtype: 'actioncolumn',
      width:40,
      dataIndex: 'butt1',
      text: '! SMS',
      items: [{
            scope: this,
            getClass: this.getClass,
            icon: '../resources/images/icons/icon_blank.png',
            handler: this.actionHandler
            },
            {
            scope: this,
            getClass: this.getClass,
            icon: '../resources/images/icons/icon_blank.png',
            handler: this.actionHandler
          }
    ]
    },
    { xtype: 'actioncolumn',
      width:20,
      dataIndex: 'butt3',
      icon: '../resources/images/icons/delete_minus.png',
      handler: function(grid, rowIndex, colIndex, actionColumn, e) {
        //alert('tree: ' + view + ', rowIndex=' + rowIndex + ', colIndex=' + colIndex);
        //var gridstore = ExtMVC.model.NotesTree.getStore();
        var record = grid.store.getAt(rowIndex);
       // _d(record.get('id'));

        cmp.deleteRow(rowIndex);

        //uncheck from treegrid
        var NotesTree  = Ext.getCmp('win-notes-tree');
        NotesTree.unCheck(record.get('id'));

      }
    }
  ]
});

    this.callParent(arguments);
   },


deleteByUID: function(uid) {
        var record = this.store.findRecord('id', uid);
        this.store.remove(record);

          //hide if grid is empty
        if (this.store.getCount()==0)
           this.setVisible(false);
      },

deleteRow: function(id) {
        this.store.removeAt(id);

        //hide if grid is empty
        if (this.store.getCount()==0)
           this.setVisible(false);
      },

addRow: function(record){
   this.store.insert(0, record);
},

actionHandler: function(tree, rowIndex, colIndex, actionColumn, e) {
            alert('tree: ' + tree + ', rowIndex=' + rowIndex + ', colIndex=' + colIndex);
            },

getClass: function(value,meta,record,rowIx,ColIx, store) {
  //_d(record);

    return record.get("name")?//test some condition
                'x-grid-center-icon': //Show the action icon
                'x-hide-display';  //Hide the action icon
}
  });