var playlist = window.playlist || {};

playlist.ItemView = Backbone.View.extend({

	tagName: "li",
	className: "item left animate",

	initialize: function(options)
	{
		_.bindAll(this,"onClick");
		this.render();

		$(this.el).click(this.onClick);
		$(this.el).toggleClass("even",options.index%2==0);
	},

	onClick: function()
	{
		$(".item").removeClass("active");
		$(this.el).addClass("active");
		$("body").trigger("playlist:playLink",[this]);
	},

	render: function()
	{
		var n = this.model.get("name");
		var name = n.length > 40 ? n.substr(0,40) + "..." : n;
		var date = new Date(this.model.get("created_time"));

		var html = "<img src='"+this.model.get("picture")+"' class='left'/>";
		html += "<span class='left name'>"+name+"</span>";
		console.log(this.model);
		html += "<span class='date'> Liked on: "+date.getDate()+"-"+date.getMonth()+"-"+date.getYear()+"</span>";

		$(this.el).html(html);

		return this;
	}
});
