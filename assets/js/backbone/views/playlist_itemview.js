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
		var html = "<img src='"+this.model.get("picture")+"'/>";
		html += "<span>"+this.model.get("name")+"</span>";
		$(this.el).html(html);

		return this;
	}
});