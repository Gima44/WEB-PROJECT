$(document).ready(function() {
    //checkUserStatus();
    checkPharmaStatus();
});

/*function checkUserStatus() {
    $.ajax({
        url: "assets/js/src/session.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            var userEmail = response.UserEmail;
            var userID = response.UserID;
            if (userEmail === "" || userID === "") {
                $("#UserAcc").text("CUSTOMER ACCOUNT");
                if (window.location.pathname.includes("payment.html") || window.location.pathname.includes("user_account_tab.html") || window.location.pathname.includes("user_orders.html") ){
                    alert("Not Logged in, Auto Redirect...");
                    window.location.href = "LandingPage.html";
                }
                // if (window.location.pathname.includes("Home.html")) {
                //     window.location.href = "LandingPage.html";
                // }
                document.getElementById("setUserStat").value = "";
            } else {
                $("#UserAcc").text("YOUR INTERFACE");
                // Redirect to Home.html if the user in LandingPage.html
                if (window.location.pathname.includes("userLogin.html")) {
                    window.location.href = "Home.html";
                    // alert("Welcome Back, " + userEmail + " !");
                } else if (window.location.pathname.includes("Home.html")) {
                    alert("Welcome Back "+ userEmail);
                    $("#UserAcc").text("YOUR INTERFACE");
                    document.getElementById("setUserStat").value = userID;
                } else {
                    document.getElementById("setUserStat").value = userID;
                }
            }
        }
    });
}*/
function checkPharmaStatus(){
    $.ajax({
        url: "assets/js/src/session.php",
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
            var userEmail = response.UserEmail;
            var userID = response.UserID;
            var pharmacyEmail = response.PharmacyEmail;
            var pharmacyID = response.PharmacyID;

            // Check if user or pharmacy is logged in
            if ((pharmacyEmail === "" || pharmacyID === "") && (userEmail != "" || userID != "")) {
                $("#pharmaAcc").text("SELLER ACCOUNT");
                $("#UserAcc").text("YOUR INTERFACE");
                
                if (window.location.pathname.includes("userLogin.html")) {
                    window.location.href = "Home.html";
                    alert("Welcome Back " + userEmail + " !");
                } else if (window.location.pathname.includes("Home.html")) {
                    alert("Welcome Back " + userEmail + " !");
                    $("#pharmaAcc").text("SELLER ACCOUNT");
                    $("#UserAcc").text("YOUR INTERFACE");
                    document.getElementById("setUserStat").value = userID;
                } else {
                    document.getElementById("setUserStat").value = userID;
                }

                document.getElementById("pharmaStatus").value = "";
            } else {
                $("#pharmaAcc").text("SELLER DASHBOARD");
                
                if (window.location.pathname.includes("pharmacyLogin.html")) {
                    window.location.href = "Home.html";
                    alert("Welcome Back, " + pharmacyEmail+ + " !");
                } else if (window.location.pathname.includes("Home.html")) {
                    alert("Welcome Back " + pharmacyEmail + " !");
                    $("#pharmaAcc").text("SELLER DASHBOARD");
                    document.getElementById("pharmaStatus").value = pharmacyID;
                } else {
                    document.getElementById("pharmaStatus").value = pharmacyID;
                }

                document.getElementById("setUserStat").value = "";
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("AJAX request failed: ", textStatus, errorThrown);
}

function destroySession() {
    $.ajax({
        url: "assets/js/src/destroySession.php",
        type: "POST",
        data: {destroySession: true},
        success: function(response) {
            alert("You Will be logged out from the Website...");
            window.location.href = "LandingPage.html";
        }
    });
}


function deleteAccount() {
    var userID = document.getElementById("setUserStat").value;
    $.ajax({
        url: "assets/js/src/deleteAccount.php",
        type: "POST",
        data: {userID: userID},
        success: function(response) {
            alert("Your Account has been Deleted. USER:"+userID+" will be logged out from the Website...");
            window.location.href = "LandingPage.html";
        }
    });
}