Ext.define('ExtMVC.model.NotesGrid', {
  extend: 'Ext.data.Model',

  statics: {
    getStore: function(pageUuid) {

      return getStore(this.modelName + '.getStore', {
        autoLoad: true,
        fields: [
          {
          name: 'id', mapping:'id'
         },
        {
          name: 'name',mapping:'subjectId'
        },{
          name: 'cat', mapping:'categoryId'
        },{
          name: 'comment', mapping:'description'
        }, {
          name: 'important'
        },{
          name: 'sms'
        },{
          name: 'btndelete'
        }],
        proxy: {
          type: 'direct',
          directFn: 'clientCardApi.getConversationCases',
          reader: {
            type: 'json'
          },
          extraParams: {
            'pageUuid': pageUuid
          },
          paramOrder : 'pageUuid'
        },
        model: this.modelName
      });

    }

  }
});