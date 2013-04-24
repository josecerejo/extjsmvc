Ext.define('ExtMVC.view.clientcard.win.Conversation', {
  extend: 'Ext.window.Window',
  uses: ['ExtMVC.util.Client'],
  alias : 'widget.win-conversation',
  title : 'Список абонентов клиента',
  layout: 'fit',
  closable: true,
  closeAction: 'hide',
  width: 600,
  minWidth: 400,
  height: 400,
  items:null,
  initComponent: function() {

 var component = this;

 var treeStore = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        children: [
		            { text: "detention", leaf: true, cat1: true, cat2: true, cat3: true, cat4: true, cat5: true },
		            { text: "homework", expanded: true, cat1: true, cat2: false, cat3: true, cat4: false, cat5: true,
			            children: [
		                { text: "book report", leaf: true, cat1: false, cat2: false, cat3: false, cat4: false, cat5: false },
		                { text: "alegrbra", leaf: true, cat1: true, cat2: false, cat3: true, cat4: false, cat5: true },
				            { text: "testing some", expanded: false, cat1: true, cat2: false, cat3: true, cat4: false, cat5: true,
					            children: [
				                { text: "collapsed star", leaf: true, cat1: false, cat2: false, cat3: false, cat4: false, cat5: false },
				                { text: "brown galaxy",   leaf: true, cat1: true,  cat2: false, cat3: true,  cat4: false, cat5: true  }
				              ]
				            }
		              ]
		            },
		            { text: "buy lottery tickets", leaf: true, cat1: true, cat2: false, cat3: true, cat4: false, cat5: true }
		        ]
		    },
		    fields: [
		             'id',
		             {name: 'text',  type: 'string'},
		             { name: 'cat1', type: 'bool' },
		             { name: 'cat2', type: 'bool' },
		             { name: 'cat3', type: 'bool' },
		             { name: 'cat4', type: 'bool' },
		             { name: 'cat5', type: 'bool' }
		    ],
		    // добавляем метод getAt для того чтобы CheckColumn работал в Tree также как в обычном Grid.
		    // найти ноду (Ext.data.NodeInterface) по номеру строки в отображаемом дереве (т.е. свернутые ветви не считаем)
		    getAt: function(recordIndex) {
			    var counter = {v: -1}; // не считаем root
			    return this.recurseGetAt(recordIndex, counter, this.getRootNode());
		    },
				recurseGetAt: function(recordIndex, counter, node) {
				   if (counter.v == recordIndex) return node;
				   counter.v++;
				   if (!node.isExpanded()) return null;
				   for (var i in node.childNodes) {
					   var found = this.recurseGetAt(recordIndex, counter, node.childNodes[i]);
					   if (found) return found;
					 }
					 return null;
				}
		});


		var item = Ext.create('Ext.tree.Panel', {
		    title: 'Дерево причин обращений',
		    width: 500,
		    height: 350,
		    store: treeStore,
		    rootVisible: false,
		    viewConfig:{
		        markDirty: false
		    },
		    //renderTo: Ext.getDom('conversationWinContent'),
		    columns: [{
                   xtype: 'treecolumn',
                   header: 'Название/Причина',
                   dataIndex: 'text',
                   width: '48%'
                  },
		              { xtype: 'checkcolumn', header: '#1', dataIndex: 'cat1', width: '10%', listeners: { 'checkchange': this.onCheckCase } },
		              { xtype: 'checkcolumn', header: '#2', dataIndex: 'cat2', width: '10%', listeners: { 'checkchange': this.onCheckCase } },
		              { xtype: 'checkcolumn', header: '#3', dataIndex: 'cat3', width: '10%', listeners: { 'checkchange': this.onCheckCase } },
		              { xtype: 'checkcolumn', header: '#4', dataIndex: 'cat4', width: '10%', listeners: { 'checkchange': this.onCheckCase } },
		              { xtype: 'checkcolumn', header: '#5', dataIndex: 'cat5', width: '10%', listeners: { 'checkchange': this.onCheckCase } }

		           //   { xtype: 'actioncolumn', header: '#5', dataIndex: 'cat5', width: '10%',
		           // 	  icon: '',//'../resources/themes/images/default/menu/unchecked.gif',
		            //	  handler: function(tree, rowIndex, colIndex, actionColumn, e) {
		             //     alert('tree: ' + tree + ', rowIndex=' + rowIndex + ', colIndex=' + colIndex);
		             //   },
		             //   getClass: function(v, metadata, record, rowIndex, colIndex, store) {
				         //     return (record.get('cat5') ? 'x-grid-checkheader x-grid-checkheader-checked' : 'x-grid-checkheader');
				        //    }
			          //  }
			            //
		    ]
		});




    Ext.apply(this,{
      items: [item]
    });

  this.callParent(arguments);
  },

  onCheckCase : function(column, recordIndex, checked) {
			//alert('column=' + column.dataIndex + ', recordIndex=' + recordIndex + ', checked=' + checked);
			var record = component.treeStore.getAt(recordIndex);
			if (checked) {
				// record.set(column.dataIndex) -> caseId
				alert('Добавлена заметка, причина: ' + record.get('text') + ', категория ' + column.dataIndex);
			} else {
				// delete case by caseId = record.get(column.dataIndex);
				alert('Удалена заметка, причина: ' + record.get('text') + ', категория ' + column.dataIndex);
			}
	  }


});
