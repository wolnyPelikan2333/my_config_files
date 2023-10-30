(function () {
    chrome.action.setPopup({
        popup: 'index.html'
    });
    updateFileCount();
    checkUser().then(status => {
        if (status) {
            document.querySelector('.loginbtn').classList.add('hide');
            document.querySelector('.userface').classList.remove('hide');
        }
    });

    let fullScreen = document.querySelector(".fullScreen");
    let mainBox = document.querySelector(".main-box");
    if(fullScreen){
        fullScreen.addEventListener('click',function(){
            if(mainBox.classList.contains('fullScreen_box')){
                mainBox.classList.remove('fullScreen_box');
            }else{
                mainBox.classList.add('fullScreen_box');
            }
        })
    }

    setRateUs();
})();