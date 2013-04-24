Ext.define('Umb.data.BalancesStore', {
  extend: 'Ext.data.ArrayStore',
  storeId: 'BalancesStore',
    fields: [
    {
      name: 'name', // mapping: 'balance.name', // mapping not working, why? using convert instead
      convert: function(v, record) {
        return record.raw.balance.name;
      }
    },
    {
      name: 'amount',
      type: 'float'
    }
    ],
    autoLoad: false
});