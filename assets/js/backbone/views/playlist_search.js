var playlist = window.playlist || {};

playlist.SearchView = Backbone.View.extend({

	initialize: function(options)
	{
		_.bindAll(this,"onKeydown");

		this.render();
		$("input").keydown(this.onKeydown)
	},

	onKeydown: function(e)
	{
		if(e.which == 13)
		{
			this.trigger("playlist:search",$("input").val());
		}
	},

	render: function()
	{
		var html = "<input type='text' placeholder='username'></input>";

		$(this.el).html(html);
	}
});