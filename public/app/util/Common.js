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

function outString(s) {
  return (s ? s : '');
}

function _d(v){
  //console.log(v);
}




function getStore(storeId, storeConfig, storeType) {
  //get static store
  var store = Ext.StoreMgr.get(storeId);
  if (!store) {
    //try create store
    _d('get dynamic store: '+storeConfig.proxy.directFn);

    storeType = storeType? storeType : 'Ext.data.Store';
    store = Ext.create(storeType, storeConfig);
    //add store to array store
    Ext.StoreMgr.add(storeId, store);

    return store;
  }

  _d('get cache store '+storeId);
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
    }
  };


  if (model){
    config.model = model;
  }

  if (extra) {
    config = Ext.apply(config, extra);
  }

  return config;
}



function array_values( input ) {    // Return all the values of an array
  var tmp_arr = new Array(), cnt = 0;
  for ( key in input ){
    tmp_arr[cnt] = input[key];
    cnt++;
  }

  return tmp_arr;
}


function array_is_empty( input ) {
  for ( key in input ){
    if(input[key])
      return false;
  }

  return true;
}


function is_array(inputArray) {
return inputArray && !(inputArray.propertyIsEnumerable('length')) && typeof inputArray === 'object' && typeof inputArray.length === 'number';
}



function obj2array(out, obj, prefix) {

  for (var i in obj) {
      var key = prefix+'.'+i;
      var val = obj[i];

      if(typeof val == 'object') {
         obj2array(out,val,key);
      }
      else {
        out[key] = val;
      }
  }

return out;
}


function setComponentValues (cmp, obj, name){
  _d('setComponentValues '+name);

  var data = obj2array({}, obj, name);
  cmp.setValues(data);
}