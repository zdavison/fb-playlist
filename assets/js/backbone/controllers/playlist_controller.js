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
		this.currentUserID = "";

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
		this.currentUserID = id;
		$(".results ul").html("");

		FB.api('/' + id, {
          fields: 'links'
        },
        this.onFBLinksLoaded);

        $(".friendList").addClass("hidden");
        $(".results").removeClass("hidden");
        $('.loading').removeClass('hidden');
	},

	onSearchForUsername: function(name)
	{
		this.currentUserID = "";
		var possibleFriends = this.friendList.filter(function(friend){
			return friend.get("name").toLowerCase().indexOf(name.toLowerCase()) > -1;
		});

		this.searchFriendList.reset(possibleFriends);
		$(".friendList").removeClass("hidden");
		$(".results").addClass("hidden");
		$('input').removeClass("middle");
	},

	onFBLogin: function(){
		FB.api('/me', {
          fields: 'friends,name'
        },
        this.onFBFriendsLoaded);
        $('.loading').removeClass('hidden');
	},

	onFBFriendsLoaded: function(response)
	{
		//lets add ourselves to the list too
		var me = {id: response.id, name: response.name};
		response.friends.data.push(me);
		this.searchFriendList.reset(response.friends.data);
		this.friendList.reset(response.friends.data);
		$('.loading').addClass('hidden');
	},

	onFBLinksLoaded: function(response)
	{
		var result = (response.links) ? response.links : response;
		if(result.data)
			this.itemList.parseAndReset(result.data);
		if(result.paging && result.paging.next && this.currentUserID == result.data[0].from.id)
			this.loadLinksWithURL(result.paging.next);
		else
			$('.loading').addClass('hidden');
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
	},

	onPlayLink: function(event,view){
		$(".active").html(new playlist.ItemView({model:view.model}).render().el);
		var scView = new playlist.SoundcloudItemView({model:view.model});
		var soundcloud = $(view.el).html(scView.render().el);
        var widget       = SC.Widget(document.getElementById("soundcloudPlayer"));
        widget.bind(SC.Widget.Events.FINISH, function(){
        	var nextToPlay = $(".results ul").children(".active").next();
        	console.log(nextToPlay);
        	nextToPlay.trigger("click");
        });
	}
});
