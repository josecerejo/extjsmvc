Ext.define('ExtMVC.controller.ClientCard', {
  extend: 'Ext.app.Controller',
  stores: ['ClientInfoStore'],
  //models: ['Stock', 'ChartStock'],
  uses:['ExtMVC.model.ClientcardApi'],
  views: [
  'clientcard.Toolbar',
  'clientcard.ClientData',
  'clientcard.ClientHeader',
  'clientcard.win.Subscribers','clientcard.win.Notes'
  ],

  refs: [
    {
      ref: 'contentpanel',
      selector: 'ContentPanel',
      xtype: 'ContentPanel'
    },
  {
    ref: 'toolbar',
    selector: 'client-toolbar'
  },
    {
    ref: 'clientheader',
    selector: 'ClientCardHeader'
  },
  {
    ref: 'clientdata',
    selector: 'ClientCardData'
  },
  {
    ref: 'winSubscribers',
    selector: 'win.Subscribers'
  },
  {
    ref: 'winNotes',
    selector: 'win.Notes'
  }
  ],

  pageUuid:null,
  isClientCardLoaded: false,

  init: function() {

    if (this.inited){
      return;
    }
    this.inited = true;

    _d('init ClientCard controller');
    this.pageUuid = getQueryParam('pageUuid');


    this.control({

      'toolbar': {
       // beforerender: this.loadClientData,
        openClientToolbar: this.openClientToolbar
      },
      'ClientCardData':{
       // beforerender: this.loadClientData
      //  rerender2: this.ClientDataRerender
      },
      'win-notes-tree':{
        doNotesTreeCheck: this.doNotesTreeCheck
    //    doNotesTreeUnCheck: this.doNotesTreeUnCheck
      },
      'win-notes-template':{
        doNotesAdd: this.doNotesAdd
      }
    });

    //app listeners
     this.application.on({
        clientloaded: this.clientloaded,
        scope: this
    });
  },

actionIndex: function(){
  _d('clientcard actionIndex');


 //load Client data object
 ExtMVC.util.Client.init(this.pageUuid);
},


clientloaded: function(client){
   _d('controller clientloaded');

   var Client = ExtMVC.util.Client;

   if (!this.isClientCardLoaded) {
      this.addClientCardPanels();
      this.isClientCardLoaded = true;
   }
   else {
     //_d(this.getClientdata());
   }

},

doApply: function(options){
   Ext.apply(this, options || {});
},


updateClientCardaPanel: function(obj, name){
  var clientcard = Ext.widget('ClientCardData');
  clientcard.updateClientDataPanel(this.conf.client.kind, obj, name);
},


addClientCardPanels: function(){

   Ext.suspendLayouts();
    //add client toolbar
      var clientToolbar = Ext.create('ExtMVC.view.clientcard.Toolbar');
      this.application.setMainView(clientToolbar);
      //add client toolbar
      var clientHeader = Ext.create('ExtMVC.view.clientcard.ClientHeader');
      this.application.setMainView(clientHeader);
      //add client data
      var clientData = Ext.create('ExtMVC.view.clientcard.ClientData');
      this.application.setMainView(clientData);
      //add client tabs
      var clientTabs = Ext.create('ExtMVC.view.clientcard.ClientTabs');
      this.application.setMainView(clientTabs);
   Ext.resumeLayouts(true);

},



//todo: move to notes controller
  doNotesTreeCheck: function(column, recordIndex, checked){
    _d('openNotesAddTemplate');

    var treeStore = ExtMVC.model.NotesTree.getStore();
    var record = treeStore.getAt(recordIndex);
    var idCell =  record.get('id') +'.'+ column.dataIndex;
    _d(record);
    //only leaf is checkable
    if (record.get('leaf')){
      var NotesGrid  = Ext.getCmp('win-notes-grid');
      //show NotesGrid
      NotesGrid.setVisible(true);

      if (checked==1) {
        //insert note row in NoteGrid
        var item = {
          id: idCell,
          name: record.get('text'),
          comment: 'comment',
          cat: column.dataIndex
        };

        //open template add window
        this.openNotesAddTemplate(item);

      } else {

        NotesGrid.deleteByUID(idCell);
      }
    }

  },

  doNotesAdd: function(item) {
    //_d('doNotesAdd');
    var NotesGrid  = Ext.getCmp('win-notes-grid');
    //NotesGrid.addRow(item);

    var row = item.id.split('.');
    var convID = parseInt(row[0]);
    var fields =['cat0','cat1','cat2','cat3','cat4'];
    var catID = parseInt(fields.indexOf(item.cat));

    clientCardApi.registerConversationCase(
      this.pageUuid,convID,catID,'case title '+item.id,item.comment,item.important,
      function(caseId) {

        if (typeof caseId != 'undefined' && caseId>0){
          Ext.Msg.alert('Сообщение', 'Зарегистрирована заметка:' + caseId);
        }
        else {
          alert('error add case: '+item.id);
          var NotesTree  = Ext.getCmp('win-notes-tree');
          NotesTree.onUnCheck(item.id);
        }
      });

    NotesGrid.getStore().load();
  },

  openNotesAddTemplate: function(record){
    var winID = 'widget.win-notes-template';
    //var win = Ext.getCmp(winID);
    //create window
    //if(!win) {
    var win = Ext.create(winID,{
      NotesRecord:record
    });
    //}

    //show window
    if(!win.isVisible()) {
      win.show();
    }
  //set window position
  //win.setPosition(item.x, item.y+30);
  },
//todo: move to notes controller





  loadClientData:function(){

    var store = ExtMVC.model.ClientInfo.getClientBalancesStore(this.pageUuid);
    store.load({
      callback: function(records, operation, success) {
        var client = records[0].raw;

        _d('getClientBalancesStore');
        _d(client);
      }
    });

  },

  //functions
  openClientToolbar: function(item){

    item.y = item.y +30;

    switch(item.id){
      case 'ClientNotes':
        this.openNotesWindow(item);
        break;
      case 'ClientSubscribers':
        this.openSubscribersWindow(item);
        break;
      case 'ClientClose':
        this.doClientClose(item);
        break;
      default:
        _d('openClientToolbar: '+item.id+' callback not found!');
    }
  },


  doClientClose: function(){



    var operation = new Ext.data.Operation({
      action: 'read'//,
    //   pageUuid  : this.pageUuid
    });
    var proxy = new Ext.data.proxy.Ajax({
      url: 'clientcard/close',
       type: 'json',
      //actionMethods:{create:'POST', read:'POST', update:'POST', destroy:'POST'},
      paramOrder : 'pageUuid',
      extraParams: {
        'pageUuid': this.pageUuid
        }
    });

    proxy.read(
      operation,
      function(r){
       //  _d(r);
        window.close();
      },
      this
      );

  },
  openSubscribersWindow:function(params) {

    //check window existance
    var winID = 'widget.win-subscribers';
    var win = Ext.getCmp(winID);
    //create window
    if(!win) {
      var win = Ext.create(winID);
      win.show();
      //set window position
      win.setPosition(params.x, params.y+30);
    }
    //show window
    if(!win.isVisible())
      win.show();
  },


  openNotesWindow:function(params) {

    //check window existance
    var winID = 'widget.win-notes';
    var win = Ext.getCmp(winID);
    //create window
    if(!win) {
      var win = Ext.create(winID);
      win.show();
      //set window position
      win.setPosition(params.x, params.y+30);
    }
    //show window
    if(!win.isVisible())
      win.show();
  }

});


