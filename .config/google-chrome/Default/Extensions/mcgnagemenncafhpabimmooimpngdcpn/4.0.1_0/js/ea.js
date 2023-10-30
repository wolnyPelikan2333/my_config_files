(function () {
    'use strict';

    let _comParams = {
        eid: '2', //exct id
        uid: '' //user id
    };
    let _pageParams = {
        name: 'pageview',
        c1: document.title,
        c2: location.hostname,
        label: location.pathname
    };

    let queue = {
        status: 1,

        push: function (data) {
            while (true) {
                if (this.status) {
                    this.status = 0;
                    let task = localStorage.getItem('__ea_queue__') != null ? JSON.parse(localStorage.getItem('__ea_queue__')) : [];
                    task.push(data);
                    localStorage.setItem('__ea_queue__', JSON.stringify(task));
                    this.status = 1;
                    break;
                }
            }
        },
        pull: function () {
            let data = "";
            while (true) {
                if (this.status) {
                    this.status = 0;
                    let task = localStorage.getItem('__ea_queue__') != null ? JSON.parse(localStorage.getItem('__ea_queue__')) : [];
                    if (task.length > 0) {
                        data = task[0];
                        task.splice(0, 1);
                        localStorage.setItem('__ea_queue__', JSON.stringify(task));
                    }
                    this.status = 1;
                    break;
                }
            }
            return data;
        }

    };
    let sender = function () {
        let data = queue.pull();
        if (data != "" && data != null) {
            let reqUrl = 'https://ea.abcdpdf.com/collect?' + data;
            let image = new Image(1, 1);
            image.onerror = function () {
                queue.push(data);
            }
            image.src = reqUrl;
        }
        setTimeout(sender, 1000);
    }
    setTimeout(sender, 1000);

    const tracker = {
        create: function (eid, options) {
            if (!options) {
                options = {};
            }
            _comParams.eid = eid;
            _comParams = Object.assign(_comParams, options);
        },
        set: function (name, value) {
            _comParams[name] = value;
        },
        get: function (name) {
            return _comParams[name] || '';
        },

        send: function (options) {
            if (options == 'pageview') {
                this.sendPageView();
            } else {
                if (options.name == 'pageview') {
                    this.sendPageView(options);
                } else {
                    this.sendEvent(options);
                }
            }
        },

        sendPageView: function (options) {
            let data = Object.assign(_comParams, _pageParams, options);
            request(data);
        },
        sendEvent: function (options) {
            let data = Object.assign(_comParams, options);
            request(data);
        },
        dataLayer: window.__dataLayer || []
    };

    for (let i in tracker.dataLayer) {
        let data = tracker.dataLayer[i];
        send(data);
    }

    tracker.dataLayer.push = function (options) {
        send(options);
    };



    function send(options) {
        let action = options[0];
        if (typeof (action) == 'function') {
            return action.call(tracker, tracker);
        }
        if (tracker[action] && typeof (tracker[action]) == 'function') {
            switch (action) {
                case 'create':
                    tracker.create(options[1], options[2]);
                    break;
                case 'set':
                    tracker.set(options[1], options[2]);
                    break;
                case 'send':
                    tracker.send(options[1]);
                    break;
            }
        }
    }


    function request(postData) {
        let query = '';
        for (let key in postData) {
            query += "&" + key + '=' + encodeURIComponent(postData[key]);
        }
        query = query.substr(1);

        queue.push(query);
    }

})(window);