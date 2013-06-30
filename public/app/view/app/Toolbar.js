Ext.define('ExtMVC.view.app.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.top-toolbar',
  pageUuid:null,

  initComponent: function() {

    var cmp = this;
    cmp.pageUuid = getQueryParam('pageUuid');


    Ext.apply(this, {
      defaults:{
        handler: function(item, ev) {
          cmp.fireEvent('openMainToolbar', item);
        }
      },
      items:[
      {
        text:'Поиск',
        id: 'Search'
      },{
        text: 'История',
        id: 'History'
      },{
        text: 'Заявки',
        id: 'Request'
      },{
        text: 'Отчеты',
        id: 'Rreport'
      },{
        text: 'SMS',
        id: 'SMS'
      },
      {
        text: 'KM',
        id: 'KM'
      },
      {
        text: 'Справка',
        id: 'Help'
      }
      ]
    });

    this.callParent(arguments);
  }
});
