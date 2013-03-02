var playlist = window.playlist || {};

playlist.ItemController = Backbone.Router.extend({
	
	routes:{
		"results":"showResultsView",
		"search":"showSearchView",
		"*path":"showSearchView"
	},

	initialize: function(options)
	{
		_.bindAll(this,"onSearch","onFBLogin","onFBFriendsLoaded","onFBLinksLoaded");

		this.searchView = new playlist.SearchView({el:".searchView"});
		this.searchView.bind("playlist:search",this.onSearch);
		$("body").bind("fb:loginReady",this.onFBLogin);
		this.friendList = new playlist.FriendList();
		this.itemList = new playlist.ItemList();
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

	onSearch: function(realName)
	{
		//grab userID
		var user = this.friendList.find(function(item){
			return item.get("name").toLowerCase().indexOf(realName.toLowerCase()) > -1;
		});

		FB.api('/' + user.get("id"), {
          fields: 'links'
        },
        this.onFBLinksLoaded);
	},

	onFBLogin: function(){
		FB.api('/me', {
          fields: 'friends'
        },
        this.onFBFriendsLoaded);
	},

	onFBFriendsLoaded: function(response){
		this.friendList.reset(response.friends.data);
	},

	onFBLinksLoaded: function(response){
		this.itemList.reset(response.links.data);
		console.log(response);
	}
});