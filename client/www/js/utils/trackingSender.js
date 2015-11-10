(function(context){
    var trackSender;

    _load(function () {
        trackSender = _getTrackSender();
    });

    window.sendTrack = function (pageName, data, isDelay) {
        try {
            if (!pageName) {
                return;
            }

            if (trackSender) {
                if (isDelay === true) {
                    (function (data) {
                        setTimeout(function () {
                            trackSender.track(pageName, data);
                        }, 300);
                    })(data);
                }
                else {
                    trackSender.track(pageName, data);
                }
            }
            else {
                _load(function () {
                    trackSender = _getTrackSender();

                    if (isDelay === true) {
                        (function (data) {
                            setTimeout(function () {
                                trackSender.track(pageName, data);
                            }, 300);
                        })(data);
                    }
                    else {
                        trackSender.track(pageName, data);
                    }
                });
            }
        }
        catch(e){
            console.log('Faild to send tracking', {
                pageName: pageName,
                properties: data
            });
        }
    };

    function _load(call){
        try {
            var scriptUrl = context.config.trackingUrl + "/track.js";

            $.getScript(scriptUrl, function (response, status) {
                if (status == "success") {
                    if (call) {
                        call();
                    }
                }
                else{
                    console.log('Faild to load track script.');
                }
            });
        }
        catch(e){
            console.log('Faild to load track script.');
        }
    }

    function _getTrackSender(){
        if(trackSender){
            return trackSender;
        }

        var sender = window.track('collector');
        sender.init({siteUrl: context.config.trackingUrl});

        return sender;
    }

    function _getUserAgent() {
        return window.navigator.userAgent || window.navigator.vender || window.opera;
    }

    function _isMobile(){
        return /mobile/i.test(_getUserAgent());
    }

    $(document).ready(function(){
        window.sendTrack(window.t_PageName, null, true);
    });

})(angular.bplus = angular.bplus || {});