Ext.define('ExtMVC.util.Common', {

//  singleton: true,

  clientId: null,
	selectedSubscriberId: null,
/*
  getText: function() {
    return 'hello world';
  }
*/

loadClientInfo : function() {
	                 headerLoadMaskMng(true);
	                 clientCardApi.getClient(pageUuid, function(client) {
	       	             headerLoadMaskMng(false);
	                   if (!client) {
	                	   Ext.Msg.alert('Ошибка', 'Не удалось загрузить данные клиента!' );
	                	   return false;
	       	               }
	                   //alert('Загружен клиент: ' + JSON.stringify(client));
	                     clientCard.clientId = client.id.localId;
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
		       	      clientCard.selectedSubscriberId = subscriber.id.localId;
		       	        Ext.getDom('headerSubscriberMsisdn').innerHTML = outString(subscriber.msisdn);
		       	        Ext.getDom('headerSubscriberTariff').innerHTML = outString(subscriber.tariffPlanName); // dictTariffPlan.name
		       	        Ext.getDom('headerSubscriberPstn').innerHTML = outString(subscriber.pstnNumber);
		       	        Ext.getDom('headerSubscriberName').innerHTML = outString(subscriber.name);
		             },

loadSelectedSubscriberInfo: function() {
	       	      headerLoadMaskMng(true);
	       	      clientCardApi.getSelectedSubscriber(pageUuid, function(subscriber) {
	       	          headerLoadMaskMng(false);
	       	      if (!subscriber) {
	       	   	    // subscriber not selected
	       	   	    return false;
	       	      }
	       	      clientCard.updateSubscriberInfo(subscriber);
	              });
	             },

selectAndLoadSubscriber :function(subscriberId) {
		       	      headerLoadMaskMng(true);
		       	      clientCardApi.selectSubscriber(pageUuid, subscriberId, function(subscriber) {
		       	          headerLoadMaskMng(false);
		       	      if (!subscriber) {
		       	   	    // subscriber not selected
		       	   	    return false;
		       	      }
		       	      clientCard.updateSubscriberInfo(subscriber);
		             });
	             },

loadBranchInfo : function() {
	       	      headerLoadMaskMng(true);
	       	      clientCardApi.getBranch(pageUuid, function(branch) {
	       	          headerLoadMaskMng(false);
	       	      if (!branch) { return false; }
	       	      //alert('Загружен регион: ' + JSON.stringify(branch));
	       	        Ext.getDom('headerBranchName').innerHTML = branch.name;
	       	      });
	             },

loadClientBalancesInfo : function() {
	       	      headerLoadMaskMng(true);
	       	      clientCardApi.getClientBalances(pageUuid, function(balances) {
	       	          headerLoadMaskMng(false);
	       	        if (!balances) { clientBalancesStore.removeAll(); return false; }
	       	        //alert('Загружены балансы клиента: ' + JSON.stringify(balances));
	       	        clientBalancesStore.loadData(balances);
	       	      });
	             },

loadSelectedSubscriberBalancesInfo : function() {
	             headerLoadMaskMng(true);
	             clientCardApi.getSelectedSubscriberBalances(pageUuid, function(balances) {
	                 headerLoadMaskMng(false);
	               if (!balances) { subscriberBalancesStore.removeAll(); return false; }
	               //alert('Загружены балансы абонента: ' + JSON.stringify(balances));
	               subscriberBalancesStore.loadData(balances);
	               });
	             }

});


