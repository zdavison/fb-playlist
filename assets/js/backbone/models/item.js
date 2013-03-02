var playlist = window.playlist || {};

playlist.Item = Backbone.Model.extend({

});

playlist.ItemList = Backbone.Collection.extend({
	model: playlist.Item
});
