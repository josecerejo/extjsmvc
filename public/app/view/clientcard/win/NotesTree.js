Ext.define('ExtMVC.view.clientcard.win.NotesTree', {
  extend: 'Ext.tree.Panel',
  uses:['ExtMVC.model.Incidents','ExtMVC.model.NotesTree','Ext.ux.CheckColumn', 'ExtMVC.view.clientcard.win.NotesTemplate'],
  requires:['Ext.ux.CheckColumn'],
  id : 'win-notes-tree',
  alias : 'widget.win-notes-tree',
  title: 'Регистрация заметок',
  flex:2,
  rootVisible: false,
  catStore:null,
  viewConfig:{
    markDirty: false
  },
 mask:null,
 initComponent: function() {

    var cmp = this;
    cmp.store  = ExtMVC.model.NotesTree.getStore();
    cmp.mask = new Ext.LoadMask(cmp, {msg: "Подождите, идет загрузка данных..."});


    //var s = ExtMVC.model.Incidents.getCategoriesStore();
    /*
  var s = ExtMVC.model.Incidents.getCategoriesStore();
    s.load({
      scope : this,
      callback: function(records, operation, success) {
        var arr =[];


             Ext.each(records, function(item) {
                var i = item.raw;
                arr.push({
                          header: i.shortName,
                          dataIndex: 'cat' + i.id,
                          xtype: 'checkcolumn',
                          width: '10%'
                        });
            });
            //_d(arr);
            cmp.items.push(arr[0]);

           // cmp.items = arr;
      }
    });

*/
    /*
var tmp = [];
incidentsApi.getCategories('GENERIC', function(categories) {
 	        //alert('Загружен список категорий: ' + JSON.stringify(categories));
          _d(tmp);

          tmp.push({
          xtype: 'treecolumn',
          header: 'Название/Причина',
          dataIndex: 'text',
          width: '48%'
         });

 	      });
_d(tmp);
*/



    var items = [{
      xtype: 'treecolumn',
      header: 'Название/Причина',
      dataIndex: 'text',
      width: '48%'
    },
    {
      header: 'Инфо',
      dataIndex: 'cat0',
      renderer: this.customrenderer
    },

    {
      header: 'Техн',
      dataIndex: 'cat1',
      renderer: this.customrenderer
    },
    {
      header: 'Тариф',
      dataIndex: 'cat2',
      renderer: this.customrenderer
    },

    {
      header: 'Прод',
      dataIndex: 'cat3',
      renderer: this.customrenderer
    },
    {
      header: 'Адм.',
      dataIndex: 'cat4',
      renderer: this.customrenderer
    }
    ];

    Ext.apply(this, {
      listeners: {
        afterrender: cmp.onAfterrender.bind(cmp),
        load: cmp.onLoad.bind(cmp)
      },
      columns: {
        defaults:{
          xtype: 'checkcolumn',
          width: '10%',
          listeners: {
            scope:this,
            'checkchange': this.onCheck,
            'beforecheckchange':this.onBeforecheckchange
          }
        },
        items: items
      }
    });

    this.callParent(arguments);
  },

  onAfterrender:  function() {
    //_d('afterrender');
   this.mask.show();
  },
  onLoad:  function() {
    _d('onload');
   // var NotesGrid  = Ext.getCmp('win-notes-grid');
    //NotesGrid.getStore().load();
    this.mask.hide();
  },


  customrenderer : function(value,m,row){
    //_d('renderer value: '+value);
    //_d(row);

    //show checkbox only on leaf rows
    if (!row.get('leaf')) {
      return '';
    }
    if (value === ''){
      return '';
    }

    var cssPrefix = Ext.baseCSSPrefix,
    cls = [cssPrefix + 'grid-checkheader'];


    if (value == 1) {
      cls.push(cssPrefix + 'grid-checkheader-checked');
    }
    if (value == -1){
      cls.push(cssPrefix + 'grid-checkheader-disabled');
    }

    return '<div class="' + cls.join(' ') + '">&#160;</div>';
  },

  onBeforecheckchange : function(column, recordIndex, checked) {
   // _d(this);
  },
  onCheck : function(column, recordIndex, checked) {
  //_d('onCheck: '+checked);
    this.fireEvent('doNotesTreeCheck', column, recordIndex, checked);
  },
  onUnCheck: function(rowIndex){
    _d('onUnCheck: '+rowIndex);

    var row = rowIndex.split('.');
    var record = this.getStore().getById(row[0]);
    record.set(row[1], false);
  },

    doCheck: function(rowIndex){
    _d('doCheck: '+rowIndex);

    var row = rowIndex.split('.');
    var record = this.getStore().getById(row[0]);
    record.set(row[1], 1);
  },

  reloadTree: function(){

    this.mask.show();
    this.getStore().load();

    var NotesGrid  = Ext.getCmp('win-notes-grid');
    NotesGrid.getStore().load();

  }





});

