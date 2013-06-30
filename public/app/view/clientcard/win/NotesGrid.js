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
  mask:null,
  treeStore:null,
  catStore:null,
  pageUuid:'',
  initComponent: function() {
    var cmp = this;
    cmp.pageUuid = getQueryParam('pageUuid');
    var store = ExtMVC.model.NotesGrid.getStore(cmp.pageUuid);
    cmp.mask = new Ext.LoadMask(cmp, {
      msg: "Подождите, идет загрузка данных..."
    });


    cmp.treeStore = ExtMVC.model.NotesTree.getStore();
    cmp.catStore  = ExtMVC.model.Incidents.getCategoriesStore();
    //todo:remove .load()
    cmp.catStore.load();

    Ext.apply(this, {
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp),
        load: cmp.onLoad.bind(cmp)
      },
      store: store,
      columns: [
      {
        width     : 50,
        dataIndex: 'id',
        hidden: true
      },
      {
        dataIndex: 'name',
        text:'Причина обращения',
        flex : 1,
        renderer: function(value, p, record) {
          var rec = cmp.treeStore.getById(record.raw.subjectId);
          return rec.get('text');
        }
      },
      {
        dataIndex: 'cat',
        text:'Категория',
        width    :50,
        renderer:  function(value, p, record) {
          var rec = cmp.catStore.getAt(record.raw.categoryId);
          return rec.get('shortName');
        }
      },
      {
        dataIndex: 'comment',
        text:'Комментарий',
        width    :150,
        flex:1,
        renderer:  function(value, p, record) {
          var comment = record.raw.description.substr(0,20);
          return comment;
        }
      },
      {
        xtype: 'actioncolumn',
        width:40,
        dataIndex: 'important',
        text: '!',
        items: [{
          scope: this,
         // icon: '../resources/images/icons/icon_blank.png',
          handler: this.actionHandler,
          getClass: function(value,meta,record,rowIx,ColIx, store) {
            return record.raw.isImportant?'x-action-important':'x-action-blank';
          }

        }
        ]
      },
      {
        xtype: 'actioncolumn',
        width:40,
        dataIndex: 'sms',
        text: 'SMS',
        items: [
        {
          scope: this,
          handler: this.actionHandler,
          getClass: function(value,meta,record,rowIx,ColIx, store) {
            return record.raw.isImportant?'x-action-checked':'x-action-blank';
          }
        }
        ]
      },
      {
        xtype: 'actioncolumn',
        width:20,
        dataIndex: 'btndelete',
        icon: '../resources/images/icons/delete_minus.png',
        handler: cmp.doDelete.bind(cmp)
      }
      ]
    });

    this.callParent(arguments);
    this.relayEvents(this.getStore(), ['load']);
  },


  onAfterrender:  function() {
     _d('afterrender-');
    this.mask.show();
  },

  onLoad:  function(store) {
     _d('onload-');

     var NotesTree  = Ext.getCmp('win-notes-tree');
     store.each(function(rec) {
       NotesTree.doCheck(rec.raw.subjectId+'.cat'+rec.raw.categoryId);
     });

     this.setVisible(store.getCount()>0);
     this.mask.hide();
  },

  doDelete: function(grid, rowIndex, colIndex, actionColumn, e) {
    //alert('tree: ' + view + ', rowIndex=' + rowIndex + ', colIndex=' + colIndex);
    //var gridstore = ExtMVC.model.NotesTree.getStore();
    var record = grid.store.getAt(rowIndex);
    this.deleteRow(rowIndex);

    //uncheck from treegrid
    var NotesTree  = Ext.getCmp('win-notes-tree');
    NotesTree.onUnCheck(record.raw.subjectId+'.cat'+record.raw.categoryId);

    this.getStore().load();
  },

  deleteByUID: function(uid) {
    var row = uid.split('.');
   //find interseption of categoryId and subjectId
    var interId = this.store.findBy(function(inter, id) {
      //_d(inter.raw.subjectId +' == '+row[0] +' && cat'+inter.raw.categoryId +'=='+ row[1]);
        return inter.raw.subjectId == row[0] && 'cat'+inter.raw.categoryId == row[1];
      });
   //var record = this.getStore().getAt(interId);
     this.deleteRow(interId);
  },

  deleteRow: function(id) {
    _d('deleteRow: '+id);

    var record = this.store.getAt(id);
    //delete from grid
    this.store.remove(record);
    //delete from server
    clientCardApi.deleteConversationCaseById(this.pageUuid, record.raw.id, function(){
 				  Ext.Msg.alert('Сообщение', 'Заметка удалена!');
 	  });

    //hide grid if it is empty
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
    return record.get("name")?//test some condition
    'x-grid-center-icon': //Show the action icon
    'x-hide-display';  //Hide the action icon
  }
});