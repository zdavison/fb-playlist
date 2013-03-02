var playlist = window.playlist || {};

playlist.FriendListView = Backbone.View.extend({

	initialize: function(options)
	{
		_.bindAll(this,"onReset","onAddItem");

		this.elList = $("ul",$(this.el));

		this.collection.bind("reset",this.onReset);
	},

	onReset: function()
	{
		this.elList.html("");
		this.collection.each(this.onAddItem);
	},

	onAddItem: function(item,index)
	{
		var friendView = new playlist.FriendView({model:item,index:index});
		this.elList.append(friendView.render().el);
	}
});