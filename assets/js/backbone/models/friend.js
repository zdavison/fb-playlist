var playlist = window.playlist || {};

playlist.Friend = Backbone.Model.extend({

});

playlist.FriendList = Backbone.Collection.extend({
	model: playlist.Friend
});
