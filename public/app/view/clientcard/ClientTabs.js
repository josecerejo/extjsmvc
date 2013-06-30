Ext.define('ExtMVC.view.clientcard.ClientTabs', {
  extend: 'Ext.tab.Panel',
  uses:['Ext.ux.tab.VerticalBar'],
  alias: 'widget.client-tabs',
  activeTab: 0,
  width:'100%',
  height:300,
  plain: true,
  defaults:{
    autoScroll: true
  },

  initComponent: function() {

    var component = this;

    Ext.apply(this, {
      items:[{
        title: 'История',
        xtype: 'verticaltabpanel',
        border: false,
        activeTab: 0,
        plain: false,
        tabsConfig: {
          width: 150,
          marginTop: 5,
          textAlign: 'left'
        },
        defaults:{
          autoScroll: true,
          border: true
        },
        items:[{
          title: 'История заметок',
          html: "История заметок содержание"
        },{
          title: 'История доп. продаж',
          html: 'История доп. продаж содержание'
        },{
          title: 'История SMS',
          html: 'История SMS содержание'
        },{
          title: 'История заявок',
          html: "История заявок содержание"
        }
        ]
      },{
        title: 'Тех. проблемы',
        html: 'Тех. проблемы содержание'
      }
      ]
    });

    this.callParent(arguments);
  }
});
