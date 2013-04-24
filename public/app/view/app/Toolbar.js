Ext.define('ExtMVC.view.app.Toolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.top-toolbar',

  initComponent: function() {

    var component = this;

   Ext.apply(this, {
        items:[
          {
	                 text:'Поиск',
                   id: 'btnsearch',
	                 handler: function(item, ev) {
                     component.doButtonEvent(item);
	                 }
	             },{
	                 text: 'История',
	                 id: 'btnhistory',
                   handler: function(item, ev) {
                    component.doButtonEvent(item);
	                 }
	             },{
	                 text: 'Заявки',
                   id: 'btnrequest',
	                 handler: function(item, ev) {
                    component.doButtonEvent(item);
	                 }
	             },{
	                 text: 'Отчеты',
                   id: 'btnreport',
	                 handler: function(item, ev) {
                    component.doButtonEvent(item);
	                 }
	             },{
	                 text: 'SMS',
                   id: 'btnsms',
	                 handler: function(item, ev) {
                     component.doButtonEvent(item);
	                 }
                },
                {
	                 text: 'База КМ',
                   id: 'btnkm',
	                 handler: function(item, ev) {
                     component.doButtonEvent(item);
	                 }
                 },
                 {
	                 text: 'Справка',
                   id: 'btnhelp',
	                 handler: function(item, ev) {
                     component.doButtonEvent(item);
	                 }
	             }
             ]
      });

    this.callParent(arguments);
  },

  doButtonEvent:function(item){
    this.fireEvent('do'+item.id, item);
  }
});
