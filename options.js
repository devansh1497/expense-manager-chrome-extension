
$(function(){

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').text(budget.limit);
    });

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit' : limit}, function(){
                close();
            });
        }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total' : 0}, function(){
            var notifOptions = {
                type : 'basic',
                iconUrl : 'icon48.png',
                title : 'Amount reset!',
                message : 'The amount has been reset'
            };

            chrome.notifications.create('resetAmount', notifOptions);
            chrome.notifications.clear('resetAmount');
        });
    });
})