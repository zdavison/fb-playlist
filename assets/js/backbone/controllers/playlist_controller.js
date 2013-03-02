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
		var user = this.friendList.find(function(item){
			return item.get("name").toLowerCase().indexOf(realName.toLowerCase()) > -1;
		});
		this.loadLinksForUser(user.get("id"));
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
		var result = (response.links) ? response.links : response;
		this.itemList.add(result.data);
		if(result.paging && result.paging.next)
			this.loadLinksWithURL(result.paging.next);
		console.log("links is back");
		console.log(result.data);
	},

	loadLinksForUser: function(userID){
		FB.api('/' + userID, {
			fields: 'links'
		},
		this.onFBLinksLoaded);
	},

	//used for pagination
	loadLinksWithURL: function(url){
		FB.api(url, {},
		this.onFBLinksLoaded);
		console.log(url);
	}
});

