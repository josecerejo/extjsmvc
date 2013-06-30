Ext.define('ExtMVC.view.app.Content', {
  extend: 'Ext.Panel',
  alias: 'widget.content',

  initComponent: function() {

    var cmp = this;


    Ext.apply(this, {
      html:'Start page content'
    });

    this.callParent(arguments);
  }
});
