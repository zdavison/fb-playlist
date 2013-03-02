var playlist = window.playlist || {};

playlist.ItemView = Backbone.View.extend({

	tagName: "li",

	className: "item",

	initialize: function(options)
	{
		this.render();
	},

	render: function()
	{
		var html = "<li class='item'>"+this.model.get("title")+"</li>";

		$(this.el).html(html);

		return this;
	}
});