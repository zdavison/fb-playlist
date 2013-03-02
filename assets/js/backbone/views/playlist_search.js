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
		switch(e.which)
		{
			case 9:
			{
				var t=$(".friendList ul").children(":first").text();

				$("input").val(t);
				return false;
			}
			case 13:
			{
				$("input").removeClass("middle");
				$(".results").removeClass("invisible");
				this.trigger("playlist:search",$("input").val());
				break;
			}
			default:
			{
				this.trigger("playlist:searchForUsername",$("input").val());
			}
		}
	},

	render: function()
	{
		var html = "<input type='text' placeholder='username' class='middle left animate'></input>"+
				   "<div class='results left animate invisible hidden'></div>";

		$(this.el).html(html);
	}
});