var playlist = window.playlist || {};

playlist.ItemController = Backbone.Router.extend({
	
	routes:{
		"results":"showResultsView",
		"search":"showSearchView",
		"*path":"showSearchView"
	},

	initialize: function(options)
	{
		_.bindAll(this,"onSearch","onFBLogin","onFBFriendsLoaded","onFBLinksLoaded","onSearchForUsername","searchById","onSearchById");

		// models
		this.friendList = new playlist.FriendList();
		this.searchFriendList = new playlist.FriendList();
		this.itemList = new playlist.ItemList();

		// views
		this.searchView = new playlist.SearchView({el:".searchView"});
		this.searchView.bind("playlist:search",this.onSearch);
		this.friendSearchView = new playlist.FriendListView({el:".friendList",collection:this.searchFriendList});
		this.itemListView = new playlist.ItemListView({el: ".results",collection:this.itemList});
		this.lastId;

		// bind events
		this.searchView.bind("playlist:searchForUsername",this.onSearchForUsername);
		$("body").bind("fb:loginReady",this.onFBLogin);
		$("body").bind("playlist:searchById",this.onSearchById);
		$("body").bind("playlist:playLink",this.onPlayLink);
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
		$(".friendList").addClass("hidden");

		this.searchById(user.get("id"));
	},

	onSearchById: function(e, id)
	{
		this.searchById(id);
	},

	searchById: function(id)
	{
		$(".results ul").html("");

		FB.api('/' + id, {
          fields: 'links'
        },
        this.onFBLinksLoaded);

        $(".friendList").addClass("hidden");
        $(".results").removeClass("hidden");
	},

	onSearchForUsername: function(name)
	{
		var possibleFriends = this.friendList.filter(function(friend){
			return friend.get("name").toLowerCase().indexOf(name.toLowerCase()) > -1;
		});

		this.searchFriendList.reset(possibleFriends);
		$(".friendList").removeClass("hidden");
		$(".results").addClass("hidden");
	},

	onFBLogin: function(){
		FB.api('/me', {
          fields: 'friends'
        },
        this.onFBFriendsLoaded);
	},

	onFBFriendsLoaded: function(response)
	{
		this.searchFriendList.reset(response.friends.data);
		this.friendList.reset(response.friends.data);
	},

	onFBLinksLoaded: function(response)
	{
		var result = (response.links) ? response.links : response;
		this.itemList.parseAndReset(result.data);
		if(result.paging && result.paging.next)
			this.loadLinksWithURL(result.paging.next);
	},

	loadLinksForUser: function(userID)
	{
		FB.api('/' + userID, {
			fields: 'links'
		},
		this.onFBLinksLoaded);
	},

	//used for pagination
	loadLinksWithURL: function(url)
	{
		FB.api(url, {},
		this.onFBLinksLoaded);
		console.log(url);
	},

	onPlayLink: function(event,view){
		var scView = new playlist.SoundcloudItemView({model:view.model});
		var soundcloud = $(view.el).html(scView.render().el);
        var widget       = SC.Widget(document.getElementById("soundcloudPlayer"));
        widget.bind(SC.Widget.Events.FINISH, function(){
    		$(".active").html(new playlist.ItemView({model:view.model}).render().el);
        	var nextToPlay = $(".results ul").children(".active").next();
        	console.log(nextToPlay);
        	nextToPlay.trigger("click");
        });
	}
});
