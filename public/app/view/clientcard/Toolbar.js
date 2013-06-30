Ext.define('ExtMVC.view.clientcard.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.client-toolbar',

  initComponent: function() {

    var cmp = this;

    Ext.apply(this, {
      defaults: {
        handler: function(item, ev) {
          cmp.fireEvent('openClientToolbar', item);
        }
      },
      items:[
      {
        text: 'Заметки',
        id:'ClientNotes'
      },
      '-',
      {
        text: 'ДП',
       id:'ClientUpsales'
      },
      '-',
      {
        text:'Заявка',
        id:'ClientRequest'
      },
      '-',
      {
        text:'SMS',
        id:'ClientSMS'
      },
      '-',
        {
        text:'KM',
        id:'ClientKM'
      },
      '-',
      {
        text:'Абоненты',
        id:'ClientSubscribers'
      },
      {
        xtype: 'tbfill'
      },{
        text: 'Закрыть карточку',
        id:'ClientClose'
      }
     ]
    });

    this.callParent(arguments);
  }
});
