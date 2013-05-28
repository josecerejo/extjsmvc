//todo: убрать этот объявление отседа
//вообще узаменить это сторе моделью с методом getStore
Ext.ns('Umb.data');
Ext.define('Umb.data.BalancesStore', {
  extend: 'Ext.data.ArrayStore',
  config: {
    fields: [
    {
      name: 'name', // mapping: 'balance.name', // mapping not working, why? using convert instead
      convert: function(v, record) {
        return record.raw.balance.name;
      }
    },
    {
      name: 'amount',
      type: 'float'
    }
    ],
    autoLoad: false
  }
});


Ext.define('ExtMVC.util.Client', {
  //  singleton: true,
  pageUuid: null,
  clientId: null,
  selectedSubscriberId: null,
  headerLoadMask : null,
  headerLoadMaskCount: 0,

  constructor	: function(options){
    Ext.apply(this,options || {});
  },

  // маска для показа состояния загрузки данных клиента-абонента в верхнюю панель
  headerLoadMaskMng : function(show) {
    if (show) {
      if (this.headerLoadMaskCount == 0) {
        this.headerLoadMask.show();
      }
      this.headerLoadMaskCount++;
    }
    else {
      this.headerLoadMaskCount--;
      if (this.headerLoadMaskCount == 0) {
        this.headerLoadMask.hide();
      }
    }
  },

  loadClientInfo : function() {
    var cmp = this;
    this.headerLoadMaskMng(true);
    clientCardApi.getClient(this.pageUuid, function(client) {
      cmp.headerLoadMaskMng(false);
      if (!client) {
        Ext.Msg.alert('Ошибка', 'Не удалось загрузить данные клиента!' );
        return false;
      }
      //alert('Загружен клиент: ' + JSON.stringify(client));
      cmp.clientId = client.id.localId;
      Ext.getDom('headerAccountNumber').innerHTML = outString(client.accountNumber);
      Ext.getDom('headerClientType').innerHTML = outString(client.type.name);
      Ext.getDom('headerClientStatus').innerHTML = outString(client.status.name);
      Ext.getDom('headerStatusChangeReason').innerHTML = 'todo';
      Ext.getDom('headerClientCodeWord').innerHTML = outString(client.customAttrValues.clientSecret);
      Ext.getDom('headerClientCeo').innerHTML = outString(client.customAttrValues.ceoData);
      Ext.getDom('headerClientAgreement').innerHTML = (client.customAttrValues.isNotAgreePersonalDataUsage == '0' ? 'ДА' : 'НЕТ');
      Ext.getDom('headerAuthorizedDelegate').innerHTML = outString(client.customAttrValues.authorizedDelegate);
      Ext.getDom('headerClientTariff').innerHTML = outString(client.tariffPlanName);
      Ext.getDom('headerClientBonus').innerHTML = 'todo';
    });
  },

  updateSubscriberInfo : function(subscriber) {
    this.selectedSubscriberId = subscriber.id.localId;
    Ext.getDom('headerSubscriberMsisdn').innerHTML = outString(subscriber.msisdn);
    Ext.getDom('headerSubscriberTariff').innerHTML = outString(subscriber.tariffPlanName); // dictTariffPlan.name
    Ext.getDom('headerSubscriberPstn').innerHTML = outString(subscriber.pstnNumber);
    Ext.getDom('headerSubscriberName').innerHTML = outString(subscriber.name);
  },

  loadSelectedSubscriberInfo: function() {
    var cmp = this;

    this.headerLoadMaskMng(true);
    clientCardApi.getSelectedSubscriber(this.pageUuid, function(subscriber) {
      cmp.headerLoadMaskMng(false);
      if (!subscriber) {
        // subscriber not selected
        return false;
      }
      cmp.updateSubscriberInfo(subscriber);
    });
  },

  selectAndLoadSubscriber :function(subscriberId) {

    this.headerLoadMaskMng(true);
    var cmp = this;

    clientCardApi.selectSubscriber(this.pageUuid, subscriberId, function(subscriber) {
      cmp.headerLoadMaskMng(false);
      if (!subscriber) {
        // subscriber not selected
        return false;
      }
      cmp.updateSubscriberInfo(subscriber);
    });

  },

  loadBranchInfo : function() {
    var cmp = this;
    this.headerLoadMaskMng(true);
    clientCardApi.getBranch(this.pageUuid, function(branch) {
      cmp.headerLoadMaskMng(false);
      if (!branch) {
        return false;
      }
      //alert('Загружен регион: ' + JSON.stringify(branch));
      Ext.getDom('headerBranchName').innerHTML = branch.name;
    });
  },

  loadClientBalancesInfo : function() {
    var clientBalancesStore = new Umb.data.BalancesStore(); //ExtMVC.store.BalancesStore.getStore();
    var cmp = this;

    this.headerLoadMaskMng(true);
    clientCardApi.getClientBalances(this.pageUuid, function(balances) {
      cmp.headerLoadMaskMng(false);
      if (!balances) {
        clientBalancesStore.removeAll();
        return false;
      }
      //alert('Загружены балансы клиента: ' + JSON.stringify(balances));
      clientBalancesStore.loadData(balances);
    });
  },

  loadSelectedSubscriberBalancesInfo : function() {
    // хранилища данных для балансов клиента и абонента
    var subscriberBalancesStore = new Umb.data.BalancesStore(); //ExtMVC.store.BalancesStore.getStore();
    var cmp = this;

    this.headerLoadMaskMng(true);
    clientCardApi.getSelectedSubscriberBalances(this.pageUuid,
      function(balances) {
        cmp.headerLoadMaskMng(false);
        if (!balances) {
          subscriberBalancesStore.removeAll();
          return false;
        }
        //alert('Загружены балансы абонента: ' + JSON.stringify(balances));
        subscriberBalancesStore.loadData(balances);
      });
  }

});


