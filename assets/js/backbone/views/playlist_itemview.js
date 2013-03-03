var playlist = window.playlist || {};

playlist.ItemView = Backbone.View.extend({

	tagName: "li",
	className: "item left animate",

	initialize: function(options)
	{
		_.bindAll(this,"onClick");
		this.render();

		$(this.el).unbind("click");
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
		var name = n.length > 55 ? n.substr(0,55) + "..." : n;

		var html = "<img class='left fade-in' src='"+this.model.get("picture")+"'/>";
		html += "<span class='left name fade-in'>"+name+"</span>";

		if(this.model.get("message")!== undefined && this.model.get("message") !== '')
			html += "<span class='date'>"+this.model.get("message")+"</span>";
		else if(this.model.get("description")!== undefined && this.model.get("description") !== '')
			html += "<span class='date'>"+this.model.get("description")+"</span>";

		$(this.el).html(html);

		return this;
	}
});
