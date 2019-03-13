
function _(str) {
    return document.querySelector(str);
}


// check if there is a token
const checkToken = !! localStorage.getItem("goaltoken");

// the path we dont want just anyone to see
if(location.pathname == "/profile.html") {

    // if there's jo token, redirect the user to login
    if(!checkToken) {
    location.replace('/login.html');
    }

}

// For registration
const regForm = _("#regForm");

if(regForm) {

    regForm.addEventListener("submit", function(e) {
        e.preventDefault();
       const name = _("#rname").value;
       const email = _("#remail").value;
       const phone = _("#rphone").value;
       const type = _("#rtype").value;
       const pwd = _("#rpwd").value;
       const cpwd = _("#rcpwd").value;


       const userData = {
           name: name,
           email: email,
           phone_number: phone,
           account_type: type,
           password: pwd,
           password_confirmation: cpwd
       }

       const registerUrl = "https://goaltickapp.herokuapp.com/api/register";

       axios.post(registerUrl, userData).then(function(response) {

            console.log(response.data);

       }).catch(function(err) {
           console.log(err.response)
       })


    })

}


// Login User
const loginForm = _("#loginForm");

if(loginForm) {

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = _("#lemail").value;
        const pwd = _("#lpwd").value;
    
        const userData = {
            email: email,
            password: pwd
        }
    
    
        const loginUrl = "https://goaltickapp.herokuapp.com/api/login";
    
        axios.post(loginUrl, userData).then(function(response) {
            
            console.log(response.data)

            const token = response.data.data.token

            localStorage.setItem('goaltoken', token);

            location.replace("/profile.html")
    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}




// View Users Profile
const profile = _("#profile");

if(profile) {

    const profileUrl = "https://goaltickapp.herokuapp.com/api/dashboard";

    const token = localStorage.getItem("goaltoken");
   

    console.log(token)

    const options = {
        headers: {
            Authorization: token,
        }
    }

    console.log(_('#basicInfo').innerHTML)

    _('#bigName').innerHTML = "some issues";
    axios.get(profileUrl, options).then(function(response) {
        console.log(response.data.data.user);
        _('#bigName').innerHTML
 
        const user = response.data.data.user;

        localStorage.setItem('user', user)

        console.log(user.name)

        _('#bigName').innerHTML = user.name;

        _("#basicInfo").innerHTML = `
        <div class="row">
            <div class="col-sm-3 col-md-2 col-5">
                <label style="font-weight:bold;">Full Name</label>
            </div>
            <div class="col-md-8 col-6" >
                ${user.name}
            </div>
        </div>
        <hr />

        <div class="row">
            <div class="col-sm-3 col-md-2 col-5">
                <label style="font-weight:bold;">Email</label>
            </div>
            <div class="col-md-8 col-6" >
                ${user.email}
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-3 col-md-2 col-5">
                <label style="font-weight:bold;">Phone</label>
            </div>
            <div class="col-md-8 col-6" >
                ${user.phone_number}
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-3 col-md-2 col-5">
                <label style="font-weight:bold;">Joined</label>
            </div>
            <div class="col-md-8 col-6" >
                ${new Date(user.created_at).toLocaleDateString()}
            </div>
        </div>
        <hr />
        `;

    }).catch(function(err) {
        console.log(err.response);
    })
}










