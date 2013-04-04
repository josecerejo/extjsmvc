Ext.define('ExtMVC.view.clientcard.ClientData', {
  extend: 'Ext.Panel',
  alias: 'widget.ClientCardData',

  initComponent: function() {

    var component = this;

    Ext.apply(this, {
		             id: 'clientDataPanel',
	            	 title: 'Данные клиента и абонента',
	            	 //renderTo: document.body,
	            	 //width: 1.0,
	            	 layout: {
	                     type: 'table',
	                     columns: 5,
	                     tableAttrs: {
	                         style: {
	                             width: '100%'
	                         }
	                     },
	                     tdAttrs: {
	                         style: {
	                    	     border: '1px solid #99BCE8',
                	           width: '20%',
                	           verticalAlign: 'top'
                         }
                       }
	               },
	               //bodyStyle: 'padding:5px',
	               defaults: {
		               bodyStyle: 'padding: 5px; border: none;'
		             },
	               items: [{
	            	     rowspan: 2,
	                   html: '<span class="header-field-name">Лицевой счет</span><br><span class="header-field-value" id="headerAccountNumber">---</span><br><span class="header-field-name">Тип</span><br><span class="header-field-value" id="headerClientType">---</span>'
	               },{
		                 rowspan: 2,
	                   html: '<span class="header-field-name">Статус</span><br><span class="header-field-value" id="headerClientStatus">---</span><br><span class="header-field-name">Причина</span><br><span class="header-field-value" id="headerStatusChangeReason">---</span>'
	               }/*, new Umb.data.BalancesGrid({
		                 rowspan: 2,
		                 id: 'clientBalancesGrid',
		                 store: clientBalancesStore
		             })*/,{
	                   html: '<span class="header-field-name">Кодовое слово</span><br><span class="header-field-value" id="headerClientCodeWord">---</span>'
	               },{
	                   html: '<span class="header-field-name">Руководитель</span><br><span class="header-field-value" id="headerClientCeo">---</span>'
	               },{
	                   html: '<span class="header-field-name">Согласие</span><br><span class="header-field-value" id="headerClientAgreement">---</span>'
	               },{
	                   html: '<span class="header-field-name">Доверенное лицо</span><br><span class="header-field-value" id="headerAuthorizedDelegate">---</span>'
	               },{
	                   html: '<span class="header-field-name">Тариф</span><br><span class="header-field-value" id="headerClientTariff">---</span>'
	               },{
	                   html: '<span class="header-field-name">Схема бонусов</span><br><span class="header-field-value" id="headerClientBonus">---</span>'
	               },{
	                   html: '<span class="header-field-name">Филиал</span><br><span class="header-field-value" id="headerBranchName">---</span>'
	               },/* new Umb.data.BalancesGrid({
		                 id: 'subscriberBalancesGrid',
		                 store: subscriberBalancesStore,
		                 cellCls: 'subscriberCell'
		             })
                 */,{
	                   html: ''
	               },{
	            	     cellCls: 'subscriberCell',
	                   html: '<span class="header-field-name">Абонент</span><br><span class="header-field-value" id="headerSubscriberMsisdn">---</span>'
	               },{
	            	     cellCls: 'subscriberCell',
	                   html: '<span class="header-field-name">Тариф</span><br><span class="header-field-value" id="headerSubscriberTariff">---</span>'
	               },{
	            	     cellCls: 'subscriberCell',
	                   html: '<span class="header-field-name">Гор. номер</span><br><span class="header-field-value" id="headerSubscriberPstn">---</span>'
	               },{
	            	     cellCls: 'subscriberCell',
	                   html: '<span class="header-field-name">ФИО Абонента</span><br><span class="header-field-value" id="headerSubscriberName">---</span>'
	               }]
		           });

    this.callParent(arguments);
  }
});
