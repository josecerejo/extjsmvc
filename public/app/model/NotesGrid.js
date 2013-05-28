Ext.define('ExtMVC.model.NotesGrid', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'id'},
       {name: 'name'},
       {name: 'cat'},
       {name: 'comment'},
       {name: 'butt1'},
       {name: 'butt2'},
       {name: 'butt3'}
    ],

    statics: {
    getStore: function() {
      var store = Ext.StoreMgr.get('model_stores.'+this.modelName);
      if (!store) {
        store = Ext.create('Ext.data.Store',{
                model:this.modelName
                }
              );

        Ext.StoreMgr.add('model_stores.'+this.modelName, store);
      }

      return store;
    }
  }
});