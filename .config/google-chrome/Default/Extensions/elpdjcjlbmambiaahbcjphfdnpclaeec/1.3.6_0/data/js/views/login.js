$(function () {

    var user = User(ServiceSettings);

    user.updateData(function () {
        UI.changePage("main.html");
    });

    $("#login-login, #login-password").keypress(function (e) {
        if (e.keyCode === 13) {
            $("#btn-login").trigger("click");
        }
    });

    $("#btn-login").click(function () {

        if ($("#login-login").val().length < 2 ||
            $("#login-password").val().length < 2) {

            $("#login-login").addClass("invalid");
            $("#login-password").addClass("invalid");
            return;
        }

        $("#loading").show();

        $("#btn-login").attr("disabled", "disabled");
        $("#login-login").removeClass("invalid");
        $("#login-password").removeClass("invalid");
        $("#message-box-row").addClass("hide");
        $("#progress-row").show();

        var login = $("#login-login").val();
        var password = $("#login-password").val();

        user.verifyCredentials({
            username: login,
            password: password
        }, function (data) {
            $("#btn-login").removeAttr("disabled");
            $("#loading").hide();

            if (data.result) {
                user.persistCredentials({
                    username: login,
                    password: password
                }, function () {
                    user.updateData(function () {
                        UI.changePage("main.html");
                    });
                });
            } else {
                $("#login-login").addClass("invalid");
                $("#login-password").addClass("invalid");
                $("#message-box-row").removeClass("hide");
                $("#message").text(data.message);
            }
        })
    });

    // no account button click
    $("#btn-no-account").click(function () {
        Tabs.open(ServiceSettings.settings.url);
    });
    
    // tos button click
    $("#btn-tos").click(function() {
        Tabs.open(ServiceSettings.urls.tos());
    })
});