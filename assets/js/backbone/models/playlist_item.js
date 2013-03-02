var playlist = window.playlist || {};

playlist.Item = Backbone.Model.extend({
	defaults:{
		title:"TEST",
		description:""
	}
});

playlist.ItemList = Backbone.Collection.extend({
	model: playlist.Item,

	fetchByFbLinks: function(userId)
	{
		this.fetch({url:url})
	},

	parse: function(resp)
	{
		return resp.urls;
	}
});