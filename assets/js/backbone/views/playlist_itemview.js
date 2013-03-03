var playlist = window.playlist || {};

playlist.ItemView = Backbone.View.extend({

	tagName: "li",
	className: "item left animate",

	initialize: function(options)
	{
		_.bindAll(this,"onClick");
		this.render();

		$(this.el).click(this.onClick);
	},

	onClick: function()
	{
		$("body").trigger("playlist:playLink",[this]);
		$(".item").removeClass("active");
		$(this.el).addClass("active");
	},

	render: function()
	{
		var n = this.model.get("name");
		var name = n.length > 40 ? n.substr(0,40) + "..." : n;

		var html = "<img src='"+this.model.get("picture")+"' class='left'/>";
		html += "<span class='left name'>"+name+"</span>";

		if(this.model.get("message")!= undefined)
		{
			html += "<span class='date'>"+this.model.get("message")+"</span>";
		}

		$(this.el).html(html);

		return this;
	}
});
