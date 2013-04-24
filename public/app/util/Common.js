Ext.define('ExtMVC.util.Common', {

  singleton: true,

  myvar: 'myvar value',

  getText: function() {
    return 'hello world';
  }

});


function getQueryParam (name){
		   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		      return decodeURIComponent(name[1]);
 }

function outString(s) { return (s ? s : ''); }

function _d(v){
  console.log(v);
}