var playlist = window.playlist || {};

playlist.ItemController = Backbone.Router.extend({
	
	routes:{
		"results":"showResultsView",
		"search":"showSearchView",
		"*path":"showSearchView"
	},

	initialize: function(options)
	{
		_.bindAll(this,"onSearch","onFBLogin","onFBFriendsLoaded");

		this.searchView = new playlist.SearchView({el:".searchView"});
		this.searchView.bind("playlist:search",this.onSearch);
		$("body").bind("fb:loginReady",this.onFBLogin);
		this.friendList = new playlist.FriendList();
	},

	showView: function(el)
	{
		$(".views").children().addClass("hidden");
		$(el).removeClass("hidden");
	},

	showSearchView: function()
	{
		this.showView(".searchView");
	},

	showResultsView: function()
	{
		this.showView(".searchResultsView");
	},

	onSearch: function(userId)
	{
		FB.api('/' + userId, {
          fields: 'links'
        },
        this.onFBFriendsLoaded);
	},

	onFBLogin: function(){
		FB.api('/me', {
          fields: 'friends'
        },
        this.onFBFriendsLoaded);
	},

	onFBFriendsLoaded: function(response){
		this.friendList.reset(response.friends.data);
		console.log(this.friendList);
	}
});