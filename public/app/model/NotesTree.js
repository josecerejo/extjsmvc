Ext.define('ExtMVC.model.NotesTree', {
  extend: 'Ext.data.Model',

  statics: {
    getStore: function() {

      var config = getStoreConfig(false, 'incidentsApi.getSubjectsTree', {
         idProperty:'id',
          fields: [
          {
            name: 'id',
            type:'int',
            mapping:'subject.id'
          },
          {
            name: 'text',
            type: 'string',
            mapping:'subject.name'
          },

          {
            name: 'cat0',
            mapping:'subject.registarableCategories',
            convert: convCat0
          },

          {
            name: 'cat1',
            mapping:'subject.registarableCategories',
            convert: convCat1
          },

          {
            name: 'cat2',
            mapping:'subject.registarableCategories',
            convert: convCat2
          },

          {
            name: 'cat3',
            mapping:'subject.registarableCategories',
            convert: convCat3
          },

          {
            name: 'cat4',
            mapping:'subject.registarableCategories',
            convert: convCat4
          }
          ],

          autoLoad: false,
          // добавляем метод getAt для того чтобы CheckColumn работал в Tree также как в обычном Grid.
          // найти ноду (Ext.data.NodeInterface) по номеру строки в отображаемом дереве (т.е. свернутые ветви не считаем)
          getAt: function(recordIndex) {
            var counter = {
              v: -1
            }; // не считаем root
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
        config.proxy.paramOrder = 'type';
        config.proxy.extraParams = {
          'type': 'NOT_DELETED_AND_HAS_GENERIC_CATEGORIES'
        }

        return getStore(this.modelName+'.getStore', config, 'Ext.data.TreeStore');
    }
  }
});

function convCat0(value, record) {
  return convCat(value, record, 0);
}
function convCat1(value, record) {
  return convCat(value, record, 1);
}
function convCat2(value, record) {
  return convCat(value, record, 2);
}
function convCat3(value, record) {
  return convCat(value, record, 3);
}
function convCat4(value, record) {
  return convCat(value, record, 4);
}

function convCat(value, record, j) {

  var result = '';

  if (record.get('leaf')){
    if (is_array(value)){
      for (var i = 0; i < value.length; i++){
        if (value[i]==j) {
          result = 0;
        }
      }
    }
  else
    return value;


  }

  return result;
}

