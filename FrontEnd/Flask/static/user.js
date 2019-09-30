var personalname;
var username;
var password;

function signUp() {
    //Creating object for user pool
    var poolData = {
        UserPoolId : 'us-east-1_jlssO4wrF', // your user pool id here
        ClientId : '6apv44v66acs9ggl2cja6ms2tg' // your app client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (document.getElementById("inputPassword").value != document.getElementById("confirmPassword").value){
        alert("Passwords don't match :(")
        throw("Passwords don't match :(")
    } else {
        password = document.getElementById("inputPassword").value;
    }
    //Signing up users to the app
    personalname = document.getElementById("firstName").Value;
    username = document.getElementById("inputEmail").value;

    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : username, // your email here
    };
    var dataName = {
        Name : 'name',
        Value : personalname,
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    
    attributeList.push(attributeEmail);
    attributeList.push(attributePersonalName);
    
    var cognitoUser;
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        alert("check email");
    });

    //Confirm user registration
    cognitoUser.confirmRegistration('123456', true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
    });

    //Signing users in to use app
    var authenticationData = {
        Username : 'Mluffman', // your username here
        Password : '6YVj]AArMgrvV4.OraXYWSF87yseo', // your password here
    };
    var authenticationDetails = 
    new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var cognitoUser = 
    new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
        },

        onFailure: function(err) {
            alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });

    //Setting up forgot user login details
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('call result: ' + result);
        },
        onFailure: function(err) {
            alert(err);
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' ,'');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });

    //Interaction with other AWS features
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXXXXXXX': 
    result.getIdToken().getJwtToken()
        }
    });
    
    AWS.config.credentials.get(function(err){
        if (err) {
            alert(err);
        }
    });
    
}