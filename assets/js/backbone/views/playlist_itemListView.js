var playlist = window.playlist || {};

playlist.ItemListView = Backbone.View.extend({

	initialize: function(options)
	{
		_.bindAll(this,"onReset","onAddItem");

		this.elList = $("ul",$(this.el));

		this.collection.bind("reset",this.onReset);
		this.collection.bind("add",this.onReset);
	},

	onReset: function()
	{
		this.elList.html("");
		this.collection.each(this.onAddItem);
	},

	onAddItem: function(item,index)
	{
		item = new playlist.LinkView({model:item,index:index});
		this.elList.append(item.render().el);
	}
});