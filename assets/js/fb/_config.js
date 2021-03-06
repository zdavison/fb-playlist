var gAppID = '611386758887865';

window.fbAsyncInit = function() {
  FB.init({ 
    appId: gAppID,
    status: true,
    cookie: true,
    xfbml: true,
    frictionlessRequests: true,
    useCachedDialogs: true,
    oauth: true
  });

  FB.getLoginStatus(handleStatusChange);
};

// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "http://connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

// Handle status changes
function handleStatusChange(session){
    console.log('Got the user\'s session: ', session);

    if (session.authResponse) {
        document.body.className = 'connected';
        //Fetch user's id, name, and picture
        $("body").trigger("fb:loginReady");
    }
    else  {
        FB.login(function(response){},{scope:'read_stream'});
    }
}