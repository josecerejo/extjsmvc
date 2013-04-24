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
		            	 if (this.headerLoadMaskCount == 0) { this.headerLoadMask.show(); }
		            	 this.headerLoadMaskCount++;
		             }
	            	 else {
		            	 this.headerLoadMaskCount--;
		            	 if (this.headerLoadMaskCount == 0) { this.headerLoadMask.hide(); }
		             }
},

loadClientInfo : function() {
	                 this.headerLoadMaskMng(true);
	                 clientCardApi.getClient(this.pageUuid, function(client) {
	       	             this.headerLoadMaskMng(false);
	                   if (!client) {
	                	   Ext.Msg.alert('Ошибка', 'Не удалось загрузить данные клиента!' );
	                	   return false;
	       	               }
	                   //alert('Загружен клиент: ' + JSON.stringify(client));
	                     this.clientId = client.id.localId;
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
	       	      this.headerLoadMaskMng(true);
	       	      clientCardApi.getSelectedSubscriber(this.pageUuid, function(subscriber) {
	       	          this.headerLoadMaskMng(false);
	       	      if (!subscriber) {
	       	   	    // subscriber not selected
	       	   	    return false;
	       	      }
	       	      this.updateSubscriberInfo(subscriber);
	              });
	             },

selectAndLoadSubscriber :function(subscriberId) {

		       	      this.headerLoadMaskMng(true);
		       	      clientCardApi.selectSubscriber(this.pageUuid, subscriberId, function(subscriber) {
		       	          this.headerLoadMaskMng(false);
		       	      if (!subscriber) {
		       	   	    // subscriber not selected
		       	   	    return false;
		       	      }
		       	      this.updateSubscriberInfo(subscriber);
		             });
	             },

loadBranchInfo : function() {
	       	      this.headerLoadMaskMng(true);
	       	      clientCardApi.getBranch(this.pageUuid, function(branch) {
	       	          this.headerLoadMaskMng(false);
	       	      if (!branch) { return false; }
	       	      //alert('Загружен регион: ' + JSON.stringify(branch));
	       	        Ext.getDom('headerBranchName').innerHTML = branch.name;
	       	      });
	             },

loadClientBalancesInfo : function() {
	       	      this.headerLoadMaskMng(true);
	       	      clientCardApi.getClientBalances(this.pageUuid, function(balances) {
	       	          this.headerLoadMaskMng(false);
	       	        if (!balances) { clientBalancesStore.removeAll(); return false; }
	       	        //alert('Загружены балансы клиента: ' + JSON.stringify(balances));
	       	        clientBalancesStore.loadData(balances);
	       	      });
	             },

loadSelectedSubscriberBalancesInfo : function() {
	             this.headerLoadMaskMng(true);
	             clientCardApi.getSelectedSubscriberBalances(this.pageUuid, function(balances) {
	                 this.headerLoadMaskMng(false);
	               if (!balances) { subscriberBalancesStore.removeAll(); return false; }
	               //alert('Загружены балансы абонента: ' + JSON.stringify(balances));
	               subscriberBalancesStore.loadData(balances);
	               });
	             }

});


