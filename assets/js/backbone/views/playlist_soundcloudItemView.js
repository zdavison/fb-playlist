var playlist = window.playlist || {};

playlist.SoundcloudItemView = Backbone.View.extend({

	tagName: "li",
	className: "item soundcloud",

	initialize: function(options)
	{
		this.render();
	},

	render: function()
	{
		var html = "<iframe src='https://w.soundcloud.com/player/?url=";
		html += this.model.get("link") + "&color=BBC4CE&enable_api=true&auto_play=true&amp;show_artwork=true'></iframe>";
		$(this.el).html(html);

		return this;
	}
});

