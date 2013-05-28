Ext.define('ExtMVC.model.LastSearchResult', {
  extend: 'Ext.data.Model',
  fields: [
        {
          name: 'uuid'
        },
{
          name: 'clientId',
          mapping: 'searchResult.id.localId'
        },
{
          name: 'subscriberId',
          mapping: 'searchResult.subscriberId.localId'
        },
{
          name: 'msisdn',
          mapping: 'searchResult.msisdn'
        },
{
          name: 'name',
          mapping: 'searchResult.name'
        }
        ],
  statics: {
    getStore: function() {
      var config = getStoreConfig(this.modelName, 'clientCardApi.getLastSearchResults', {
        autoLoad: false
      });

      return getStore('model_stores.'+this.modelName, config);
    }

  }
});
