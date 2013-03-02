var playlist = window.playlist || {};

playlist.ItemController = Backbone.Router.extend({
	
	routes:{
		"results":"showResultsView",
		"search":"showSearchView",
		"*path":"showSearchView"
	},

	initialize: function(options)
	{
		_.bindAll(this,"onSearch","onFBLogin","onFBFriendsLoaded","onFBLinksLoaded","onSearchForUsername");

		// models
		this.friendList = new playlist.FriendList();
		this.searchFriendList = new playlist.FriendList();
		this.itemList = new playlist.ItemList();

		// views
		this.searchView = new playlist.SearchView({el:".searchView"});
		this.searchView.bind("playlist:search",this.onSearch);
		this.friendSearchView = new playlist.FriendListView({el:".friendList",collection:this.searchFriendList});

		// bind events
		this.searchView.bind("playlist:searchForUsername",this.onSearchForUsername);
		$("body").bind("fb:loginReady",this.onFBLogin);
	},

	showView: function(el)
	{
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
		$(".friendList").addClass("hidden");
	},

	onSearchForUsername: function(name)
	{
		console.log(name);
		var possibleFriends = this.friendList.filter(function(friend){
			return friend.get("name").toLowerCase().indexOf(name.toLowerCase()) > -1;
		});

		this.searchFriendList.reset(possibleFriends);
	},

	onFBLogin: function(){
		FB.api('/me', {
          fields: 'friends,picture'
        },
        this.onFBFriendsLoaded);
	},

	onFBFriendsLoaded: function(response){
		this.searchFriendList.reset(response.friends.data);
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

