var playlist = window.playlist || {};

playlist.FriendView = Backbone.View.extend({

	tagName: "li",

	className: "friend-view left",

	initialize: function(options)
	{
		_.bindAll(this,"onClick");

		this.render();
		$(this.el).toggleClass("even",options.index%2==0);

		$(this.el).click(this.onClick);
	},

	onClick: function()
	{
		$("input").val(this.model.get("name"));
		$("body").trigger("playlist:searchById",[this.model.get("id")]);
	},

	render: function()
	{
		var html = "<img src='http://graph.facebook.com/"+this.model.get("id")+"/picture'/>";
		html += "<span class='name'>"+this.model.get("name")+"</span>";

		$(this.el).html(html);

		return this;
	}

});