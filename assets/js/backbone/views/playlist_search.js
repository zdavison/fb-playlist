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
			$("input").removeClass("middle");
			$(".results").removeClass("invisible");
			this.trigger("playlist:search",$("input").val());
		}
		else
		{
			name = $("input").val() == "" ? e.which : $("input").val();
			this.trigger("playlist:searchForUsername",name);
		}
	},

	render: function()
	{
		var html = "<input type='text' placeholder='username' class='middle left animate'></input>"+
				   "<div class='results left animate invisible'></div>";

		$(this.el).html(html);
	}
});