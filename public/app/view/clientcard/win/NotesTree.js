Ext.define('ExtMVC.view.clientcard.win.NotesTree', {
  extend: 'Ext.tree.Panel',
  uses:['ExtMVC.model.NotesTree','Ext.ux.CheckColumn', 'ExtMVC.view.clientcard.win.NotesTemplate'],
  requires:['Ext.ux.CheckColumn'],
  id : 'win-notes-tree',
  alias : 'widget.win-notes-tree',
  title: 'Регистрация заметок',
  //height: 300,
  flex:2,
  rootVisible: false,
  viewConfig:{
    markDirty: false
  },

    initComponent: function() {

     var cmp = this;
     cmp.store  = ExtMVC.model.NotesTree.getStore();

_d(cmp.store);
    //var myLocalStore = Ext.state.LocalStorageProvider.create();
    //myLocalStore.set('test','1234');
//var store = Ext.create('Ext.data.Store', {
    //model: "Search"
//});


		 Ext.apply(this, {
       columns: {
          defaults:{
            xtype: 'checkcolumn',
            width: '10%',
            listeners: { 'checkchange': this.onCheckCase,
                         'beforecheckchange':this.onBeforecheckchange
                       }
          },
         items:[{
                   xtype: 'treecolumn',
                   header: 'Название/Причина',
                   dataIndex: 'text',
                   width: '48%'
                  },
		              {  header: 'Инфо', dataIndex: 'cat1', renderer: this.customrenderer},
		              {  header: 'Техн', dataIndex: 'cat2', renderer: this.customrenderer },
		              {  header: 'Тариф', dataIndex: 'cat3', renderer: this.customrenderer},
		              {  header: 'Прод', dataIndex: 'cat4', renderer: this.customrenderer },
		              {  header: 'Адм.', dataIndex: 'cat5', renderer: this.customrenderer }
		    ]
  }
});

     this.callParent(arguments);
},

   customrenderer : function(value,p1,row){

     //show checkbox only on leaf rows
     if (!row.get('leaf')) {
         return '';
     }


     var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-checkheader'];

        if (value) {
            cls.push(cssPrefix + 'grid-checkheader-disabled');
        }

        return '<div class="' + cls.join(' ') + '">&#160;</div>';
    },

onBeforecheckchange : function(column, recordIndex, checked) {

_d(myLocalStore.get('test'));


    //todo: check auto checked cells in first store array
   //  var store = ExtMVC.model.NotesTree.getStore();
   //  var record = store.getAt(recordIndex);
   //  var cell = record.get(column.dataIndex);

},
onCheckCase : function(column, recordIndex, checked) {

      var treeStore = ExtMVC.model.NotesTree.getStore();
			var record = treeStore.getAt(recordIndex);
      var idCell =  recordIndex +'.'+ column.dataIndex;
      //only leaf is checkable
      if (record.get('leaf')){
      // alert('column=' + column.dataIndex + ', recordIndex=' + recordIndex + ', checked=' + checked);

        var NotesGrid  = Ext.getCmp('win-notes-grid');
        var NotesTree  = Ext.getCmp('win-notes-tree');
        //show NotesGrid
        NotesGrid.setVisible(true);

        if (checked) {
           //open template add window
           NotesTree.openAddTemplate(record);

           //insert note row in NoteGrid
           var item = {
                       id: idCell,
                       name: record.get('text'),
                       comment: 'comment',
                       cat: column.dataIndex,
                       butt1:1,
                       butt2:2,
                       butt3:3
                      };
           NotesGrid.addRow(item);

          //	alert('Добавлена заметка, причина: ' + record.get('text') + ', категория ' + column.dataIndex);
          } else {
             NotesGrid.deleteByUID(idCell);
            // delete case by caseId = record.get(column.dataIndex);
            //alert('Удалена заметка, причина: ' + record.get('text') + ', категория ' + column.dataIndex);
          }
        }
	  },

unCheck: function(rowIndex){
   var row = rowIndex.split('.');
   var treeStore = ExtMVC.model.NotesTree.getStore();
	 var record = treeStore.getAt(row[0]);
   record.set(row[1], false);
},


  reloadTree: function(){
   this.store = ExtMVC.model.NotesTree.getStore();
   this.store.reload();
  },


 openAddTemplate: function(record){
     var winID = 'widget.win-notes-template';
     var win = Ext.getCmp(winID);
    //create window
    if(!win) {
      var win = Ext.create(winID);
    }

    //show window
    if(!win.isVisible()) {
      win.show();
    }
    //set window position
    //win.setPosition(item.x, item.y+30);

  }



		});

