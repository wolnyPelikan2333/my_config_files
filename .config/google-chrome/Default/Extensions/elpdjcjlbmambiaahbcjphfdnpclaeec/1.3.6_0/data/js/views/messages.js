$(document).ready(function () {

    var user = User(ServiceSettings);

    setTimeout(function () {
        PersistentStorage.get("messages", function (data) {
            var messages = data.messages;
            var useLeft = true;

            if (!Array.isArray(messages)) {
                return;
            }

            messages.forEach(function (message, i) {
                var box = $($("#message").html());
                if (typeof(message.message.image) !== "undefined") {
                    box.find(".card-image").attr("src", message.message.image)
                } else {
                    box.find("img.card-image").remove();
                }

                if (Array.isArray(message.message.buttons)) {
                    message.message.buttons.forEach(function (button) {
                        var btn = $("<a>", {
                            href: "#"
                        }).text(button.text)
                            .click(function () {
                                user.open.any(button.url, button.session)
                            }).appendTo(box.find(".card-action"));
                    });
                } else {
                    box.find(".card-action").remove();
                }

                box.find(".card-title").text(message.message.title);
                box.find(".card-content-true").html(message.message.body);
                var card = box.find(".card");
                var container;

                if (i === 0) {
                    card.addClass("grey-text text-darken-3");
                    container = $("#container-main");
                } else {
                    card.addClass("white-text cyan darken-2");
                    container = (useLeft ? $("#container-left") : $("#container-right"));
                    useLeft = !useLeft;
                }

                container.append(box);
            });

            Materialize.showStaggeredList("#container-main");
            Materialize.showStaggeredList("#container-left");
            Materialize.showStaggeredList("#container-right");

        });
    }, 500);
});

