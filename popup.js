
$(function(){

    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.val);
        $('#limit').text(budget.limit);
    })

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total' : newTotal}, function(){
                if(amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl : 'icon48.png',
                        title : 'Limit reached',
                        message : 'Uh oh! Looks like you have reached your limit.'
                    };
                    
                    chrome.notifications.create('limitNotif', notifOptions);
                    chrome.notifications.clear('limitNotif')
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});