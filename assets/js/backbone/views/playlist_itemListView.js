var playlist = window.playlist || {};

playlist.ItemListView = Backbone.View.extend({

	initialize: function(options)
	{
		_.bindAll(this,"onReset","onAddItem");

		this.elList = $("ul",$(this.el));

		this.collection.bind("reset",this.onReset);
	},

	onReset: function()
	{
		this.collection.each(this.onAddItem);
	},

	onAddItem: function(item,index)
	{
		item = new playlist.ItemView({model:item,index:index});
		this.elList.append(item.render().el);
	}
});