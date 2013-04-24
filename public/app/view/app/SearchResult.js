Ext.define('ExtMVC.view.app.SearchResult', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.SearchResult',
  title: 'Результаты поиска',
  width: 350,
  height: 300,
  columns: [
  {
    header: 'ФИО',
    dataIndex: 'msisdn',
    id: 'msisdnCol',
    width: 150,
    menuDisabled: true
  },

  {
    header: 'MSISDN',
    dataIndex: 'name',
    id: 'nameCol',
    width: 150,
    menuDisabled: true
  }
  ],
  defaultSortable: false,



  initComponent: function() {
    var component = this;
    component.store = Ext.data.StoreManager.lookup('SearchResultStore');

    Ext.apply(this,  {
      listeners: {
        selectionchange: function(selmodel, selected, eOpts) {

          if (selected && selected.length) {
            var uuid = selected[0].get('uuid');
            component.fireEvent('openclient', uuid);
          }
          return true;
        }
      }
    });

  this.callParent(arguments);
}
});
