Ext.define('ExtMVC.model.NotesTree', {
  extend: 'Ext.data.Model',
  statics: {
    getStore: function() {

      var store = Ext.StoreMgr.get('model_stores.'+this.modelName+'.tree');
      if (!store) {

      var  store = Ext.create('Ext.data.TreeStore',{
          fields: [
         { name: 'id', type:'int'},
         { name: 'text',  type: 'string'},
         { name: 'cat1', type: 'int' },
         { name: 'cat2', type: 'bool' },
         { name: 'cat3', type: 'bool' },
         { name: 'cat4', type: 'bool' },
         { name: 'cat5', type: 'bool' }
		    ],
        root: {
		        expanded: true,
		        children: [
		            { text: "Пакеты и скидки", expanded: true, cat1: true, cat2: false, cat3: true, cat4: false, cat5: true,
			            children: [
		                { text: "Пакеты и скидки на SMS", leaf: true, cat1: 1, cat2: false, cat3: false, cat4: false, cat5: false },
		                {  text: "Пакеты и скидки на MMS", leaf: true, cat1: 0, cat2: false, cat3: true, cat4: false, cat5: true }
		              ]
		            },
		            {  text: "Тарифы", expanded: true, cat1: true, cat2: false, cat3: 'true', cat4: false, cat5: true,
			            children: [
		                { text: "Бонусные программы теле2", leaf: true, cat1: -1, cat2: false, cat3: false, cat4: false, cat5: false },
		                { text: "Текущие акции компании", leaf: true, cat1: -1, cat2: false, cat3: true, cat4: false, cat5: true },
				            { text: "Тарифы на МГ/МН звонки", leaf: true, cat1: -1, cat2: false, cat3: true, cat4: false, cat5: true}
		              ]
		            },
                { text: "PIN/PUK коды", expanded: true, cat1: 0, cat2: false, cat3: true, cat4: false, cat5: true}
		        ]
		    },

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


      Ext.StoreMgr.add('model_stores.'+this.modelName+'.tree', store);
    }
    return store;
    }
  }
});
