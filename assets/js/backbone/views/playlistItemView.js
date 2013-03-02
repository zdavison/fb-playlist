var playlist = window.playlist || {};

playlist.ItemView = new Backbone.View.extend({

	initialize: function(options)
	{
		this.template = "../templates/playlist_item.handlebars";
		this.render();
	},

	render: function()
	{
		$(this.el).html(handlebars.template);
	}

});