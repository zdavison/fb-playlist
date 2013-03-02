var playlist = window.playlist || {};

playlist.FriendView = Backbone.View.extend({

	tagName: "li",

	className: "friend-view left",

	initialize: function(options)
	{
		this.render();
		$(this.el).toggleClass("even",options.index%2==0);
	},

	render: function()
	{
		var html = "<img src='http://graph.facebook.com/"+this.model.get("id")+"/picture'/>";
		html += "<span class='name'>"+this.model.get("name")+"</span>";

		$(this.el).html(html);

		return this;
	}

});