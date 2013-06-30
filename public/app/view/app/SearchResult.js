Ext.define('ExtMVC.view.app.SearchResult', {
  extend: 'Ext.grid.Panel',
  id: 'search-grid',
  alias: 'widget.SearchResult',
  requires: ['ExtMVC.model.SearchResult'],
  title: 'Результаты поиска',
  collapsible: true,
  width: 0,
  height: 300,
  columns: [
  {
    header: 'uuid',
    dataIndex: 'uuid',
    id: 'uuid',
    width: 50,
    //menuDisabled: true,
    hidden:true
  },
  {
    header: 'MSISDN',
    dataIndex: 'msisdn',
    id: 'msisdnCol',
    width: 150,
    menuDisabled: true
  },
  {
    header: 'ФИО',
    dataIndex: 'name',
    id: 'nameCol',
    width: 150,
    menuDisabled: true
  }
  ],
  defaultSortable: false,


  initComponent: function() {
    var cmp = this;


    //get form values
    //var formValues = Ext.getCmp('abon-search-form').getForm().getValues();
    _d('init ');
    this.store = ExtMVC.model.SearchResult.getStore();


    Ext.apply(this,  {
      loadMask: true,
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp),
        beforeload: cmp.onStoreBeforeLoad.bind(cmp),
        load: cmp.onStoreLoad.bind(cmp),
        selectionchange: cmp.onSelectionchange.bind(cmp)
      }
    });


    this.callParent(arguments);
    this.relayEvents(this.getStore(), ['beforeload']);
  },

  doReload: function() {
    //this.getStore().loadData([],false);
    var formValues = Ext.getCmp('abon-search-form').getForm().getValues();
    if (!array_is_empty(formValues))
      this.getStore().load();
  },

  onAfterrender: function() {
    _d('onAfterrender');
    Ext.getCmp('abon-search-form').fireEvent('search');
   // this.doReload();
  },
  onStoreBeforeLoad :function(store){
    _d('onStoreBeforeLoad');
    var formValues = Ext.getCmp('abon-search-form').getForm().getValues();
    store.getProxy().setExtraParam('param1', formValues);
  },

  onStoreLoad :function(store){
    _d('onStoreLoad');

    var cnt = store.getCount();
    var win = Ext.getCmp('win-search');
    if (parseInt(cnt)>0){
      this.width = 400;
      win.setWidth(700);
    }
    else {
      _d('cnt 0');
      this.width = 0;
      win.setWidth(300);
    }


    if (cnt==1){
      var record = store.getAt(0);
      _d(record);
      this.fireEvent('openclient', record.get('uuid'));
    }
  },
  onSelectionchange: function(selmodel, selected, eOpts) {

    if (selected && selected.length) {
      var uuid = selected[0].get('uuid');
      this.fireEvent('openclient', uuid);
    }
    return true;
  },
  onSearchformsubmit: function(formValues){
    _d('onSearchformsubmit');
  }



});
