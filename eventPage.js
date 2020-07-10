var contextMenuItem = {
    "id" : "spendMoney",
    "title" : "spendMoney",
    "contexts" : ["selection"] 
};

chrome.contextMenus.create(contextMenuItem);


function isInt(value){
    // return !isNan(value) && parseInt(Number(value)) == value && !isNan(parseInt(value,10));
    return true
}

chrome.contextMenus.onClicked.addListener(function(clickedData){
    if(clickedData.menuItemId == "spendMoney" && clickedData.selectionText){
        if(isInt(clickedData.selectionText)){
            chrome.storage.sync.get(["total","limit"], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);

                }
                newTotal += parseInt(clickedData.selectionText);
                chrome.storage.sync.set({'total' : newTotal}, function(){
                    if(newTotal >= budget.total){
                        var notifOptions = {
                            type: 'basic',
                            iconUrl : 'icon48.png',
                            title : 'Limit reached',
                            message : 'Uh oh! Looks like you have reached your limit.'
                        };
                        
                        chrome.notifications.create('limitNotif', notifOptions);
                        chrome.notifications.clear('limitNotif')
                    }
                })
            })
        }
    }
})