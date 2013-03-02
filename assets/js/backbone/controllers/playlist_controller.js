var playlist = window.playlist || {};

playlist.ItemController = Backbone.Router.extend({
	
	routes:{
		"results":"showResultsView",
		"search":"showSearchView",
		"*path":"showSearchView"
	},

	initialize: function(options)
	{
	},

	showView: function(el)
	{
		$(".views").children().addClass("hidden");
		$(el).removeClass("hidden");
	},

	showSearchView: function()
	{	
		this.showView(".searchView");
	},

	showResultsView: function()
	{
		this.showView(".searchResultsView");
	}
});