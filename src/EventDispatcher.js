/**
 * @author Antonio G. Greco
 * @version 1.1
 */
var $E = EventDispatcher = function () {
	var eventListeners = {};
	return{
		addEventListener: function(event, func, scope){
			if(!eventListeners[event]){
				eventListeners[event] = [];
			}
			eventListeners[event].push({func:func, scope:scope});
			return this;
		},

		removeEventListener: function(event, func){
			for(var i = 0, len = eventListeners[event].length; i < len; i+=1){
				if (eventListeners[event][i] == func){
					eventListeners[event].splice(i, 1);
				}
			}
			return this;
        },

		dispatchEvent:function(options){
			var args = [], event = options.event, scope = options.scope || null;
			for(var i = 1, len = arguments.length; i < len; i+=1){
				args.push(arguments[i]);
			}
			if (eventListeners[event]) {
				for(var j = 0, len = eventListeners[event].length; j < len; j+=1){
					if(eventListeners[event][j].scope){
						if(eventListeners[event][j].scope == scope){
			                            eventListeners[event][j].func.apply(eventListeners[event][j].scope, args);
						}
					}else{
						eventListeners[event][j].func.apply(this, args);
					}
				}
			}
			return this;
		}
	}
}();