function getGithubInfo(user) {

    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    const req = new XMLHttpRequest();
    var url = "https://api.github.com/users/"+user;
    req.open("GET",url);
    req.onload = function () {
        if (req.readyState == 4 && req.status == 200) 
        {   //ajax call readyState == 4 mean that request finished and response is ready 
            //200 defines that status is OK 
            showUser(JSON.parse(req.responseText));
        } else if (req.status == 404) {
            noSuchUser(user);
        }
    };
    req.send();
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
   $(".information").html("<label>Username: </label>"+user.name 
       +"<br/><label>Id: </label>"+user.id
       +"<br/><label>Profile Picture: </label><br/><img src='"+user.avatar_url+"' height='250' width='250'>"
       +"<br/>"+"<br/><label>Profile Link : </label>" + "<a target='_blank' href='"+user.html_url+"'>'"+user.html_url+"'</a>"
    );

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $(".information").text("Error : No such user found"); //displays when user is not found in GitHub
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
