Ext.define('ExtMVC.util.Common', {

  singleton: true,

  myvar: 'myvar value',

  getText: function() {
    return 'hello world';
  }

});


function getQueryParam (name){
		   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		      return decodeURIComponent(name[1]);
 }

function outString(s) { return (s ? s : ''); }

function _d(v){
  console.log(v);
}




function getStore(store_id, store_config, store_type) {
  //get static store
  var store = Ext.StoreMgr.get(store_id);
  if (!store) {
    _d('get dynamic store '+store_id);
    //try create store
    store = Ext.create('Ext.data.Store', store_config);
    //add store to array store
    Ext.StoreMgr.add(store_id, store);

    return store;
  }

_d('get static store '+store_id);
return store;
}


/**
 * Заполнение типового конфига для стора
 * @param model имя модели стора
 * @param root рут-пропертя для ридера-врайтера
 * @param api базовое имя API функции: для ридонли стора это имя без префикса 'RPC.',
 *        для рид-врайт стора — имя без префикса 'RPC.' и постфикса 'Index'/'Update'/'Delete'
 *        (такие префиксы и суффиксы будут добавлены автоматически, соответственно
 *        имена у API функций должны быть в таком формате)
 * @param is_writable true для read/write стора, false для read-only
 * @param extra дополнительные проперти для конфига
 */
function getStoreConfig(model, api, extra) {
  var config = {
    autoLoad: true,
    proxy: {
      type: 'direct',
      directFn: api,
      reader: {
        type: 'json'
        //root: root
      }
    },
    model: model
  };

  if (extra) {
    config = Ext.apply(config, extra);
  }

  return config;
}