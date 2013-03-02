var playlist = window.playlist || {};

playlist.Item = Backbone.Model.extend({

});

playlist.ItemList = Backbone.Collection.extend({
	model: playlist.Item,

	parseAndReset: function(data){
		var parsedData = [];
		for(var i = 0;i<data.length;i++){
			if(data[i].link.indexOf("soundcloud.") > -1){
				parsedData.push(data[i]);
			}
		}
		this.reset(parsedData);
		console.log(parsedData);
	}
});
