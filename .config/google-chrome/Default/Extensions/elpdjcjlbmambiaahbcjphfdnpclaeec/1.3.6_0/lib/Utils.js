var Utils = (function() {
    return {
        timer: {
            setTimeout: window.setTimeout.bind(window),
            clearTimeout: window.clearTimeout.bind(window),
            setInterval: window.setInterval.bind(window),
            clearInterval: window.clearInterval.bind(window)
        }
    }
})();

exports = module.exports = Utils;