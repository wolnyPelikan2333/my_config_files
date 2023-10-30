(function () {
    updateFileCount();

    checkUser().then(status => {
        if (status) {
            document.querySelector('.loginbtn').classList.add('hide');
            document.querySelector('.userface').classList.remove('hide');
        }
    });

    let f = getUrlParam('f');
    let t = getUrlParam('t');
    if (window.frames.length != parent.frames.length) {
        let mainBox = document.getElementById("main-box");
        let uploadImg = document.getElementById("upload_img");
        mainBox.classList.add('convert_'+t);
        mainBox.classList.add('convert_match');
        if(f=='pdf'){
            if(uploadImg){
                uploadImg.setAttribute("src","/images/pdfto.svg");
            }
        }else if(f == 'word'){
            if(uploadImg){
                uploadImg.setAttribute("src","/images/word_pdf.svg");
            }
        }else if(f == 'excel'){
            if(uploadImg){
                uploadImg.setAttribute("src","/images/excel_pdf.svg");
            }
        }else if(f == 'ppt'){
            if(uploadImg){
                uploadImg.setAttribute("src","/images/ppt_pdf.svg");
            }
        }
    }
    // chrome.action.setPopup({
    //     popup: 'upload.html?f=' + f + '&t=' + t
    // });

    let itemInfo = getItemInfo(f + t);
    let elConvertStatus = document.getElementById('converting');

    document.getElementById('item-h1').textContent = itemInfo.title;
    elConvertStatus.textContent = __('page_converting_text').replace('{{title}}', itemInfo.title);
    let acceptedFiles = [];
    for (let ext of convertExt(f)) {
        acceptedFiles.push('.' + ext);
    }

    let maxSize = 18;
    let user = getUser();
    if (user && parseInt(user.is_subscription) == 1) {
        maxSize = 1024;
    }

    const dropzone = new Dropzone('#upload-btn', {
        maxFiles: ['jpg', 'png'].indexOf(f) >= 0 ? null : 1,
        uploadMultiple: false,
        acceptedFiles: acceptedFiles.join(','),
        url: PDF_UPLOAD_API,
        autoProcessQueue: false,
        addRemoveLinks: false,
        previewsContainer: '.upload-preview',
        clickable: false,
        maxFilesize: maxSize,
        filesizeBase: 1024,
        thumbnailMethod: 'contain',
        thumbnailWidth: 140,
        clickable: ['#upload-box', '#upload-btn'],
        chunking: true,
        chunkSize: 1024 * 1024 * 2,
        dictFileTooBig: __('upload_file_too_big_msg')
    });
    const elUploadBox = document.getElementById('upload-box');
    const elUploadContent = document.getElementById('upload-content');
    const elUploadProgress = document.querySelector('.upload-progress');
    const elConvertProgress = document.querySelector('.convert-progress');

    var flag = false;
    var setInOut = setInterval(()=>{
        if(flag){
            updateConvertProgress(getSubProcess(currentProcess));
        }
    },300)

    dropzone.on('error', (file, error) => {
        added = false;
        if (error.indexOf(__('upload_file_too_big')) >= 0) {
            alert(error);
            if(document.querySelector(".uploadPopup")){
                location = 'buy_popup.html';
            }else{
                location = 'buy.html';
            }
            
        } else {
            alert(__('upload_err_msg'));
        }
    });

    dropzone.on('maxfilesexceeded', (file) => {
        if(document.querySelector(".uploadPopup")){
            location = 'buy_popup.html';
        }else{
            location = 'buy.html';
        }
    });

    let added = false;
    dropzone.on('addedfile', async file => {
        setTimeout(() => {
            if (!file.accepted) {
                return;
            }
            let progress = 0;
            setInterval(function(){
                progress ++;
                if(progress <= 99){
                    elUploadProgress.querySelector('span').textContent = progress;
                    elUploadProgress.querySelector('.current').style.width = progress + '%';
                }
            },50)

            if (!added && dropzone.getAcceptedFiles().length == dropzone.files.length) {
                added = true;
                elUploadContent.classList.add('hide');
                elUploadProgress.classList.remove('hide');
                elUploadProgress.querySelector('span').textContent = '0%';

                let tasks = [];
                for (let i in dropzone.getAcceptedFiles()) {
                    let _file = dropzone.getAcceptedFiles()[i];
                    tasks.push(new Promise((resolve, reject) => {
                        const fileReader = new FileReader();
                        fileReader.addEventListener('loadend', () => {
                            resolve({
                                name: _file.name,
                                size: _file.size,
                                type: _file.type,
                                dataURL: fileReader.result
                            });
                        });
                        fileReader.readAsDataURL(_file);
                    }));
                }

                Promise.all(tasks).then(files => {
                    chrome.runtime.sendMessage({
                        type: EVENTS.ADD_FILE,
                        files: files,
                        f: f,
                        t: t,
                        itemInfo: itemInfo
                    });
                });
            }
        }, 10);
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.type) {
            case EVENTS.UPLOAD_PROGRESS:
                added = false;
                elUploadContent.classList.add('hide');
                elUploadProgress.classList.remove('hide');
                elUploadProgress.querySelector('span').textContent = request.progress;
                elUploadProgress.querySelector('.current').style.width = request.progress;
                break;
            case EVENTS.START_CONVERT:
                elUploadContent.classList.add('hide');
                elUploadProgress.classList.add('hide');
                elConvertProgress.classList.remove('hide');
                break;
            case EVENTS.CONVERTING:
                elUploadContent.classList.add('hide');
                elUploadProgress.classList.add('hide');
                elConvertProgress.classList.remove('hide');
                // updateConvertProgress(getSubProcess(request.progress));
                flag = true;
                break;
            case EVENTS.SUCCESS:
                clearInterval(setInOut);
                added = false;
                updateConvertProgress("100");
                let elDownload = document.querySelector('.download-btn');
                elDownload.setAttribute('href', getDownload(request.file));
                // elDownload.classList.remove('hide');
                elConvertStatus.textContent = __('conversion_complete');
                updateFileCount();
                if(document.querySelector(".uploadPopup")){
                    location = './files_popup.html';
                }else{
                    location = './files.html';
                }
                break;
            case EVENTS.ERROR:
                added = false;
        }
        return true;
    });


    setRateUs();
 
    var currentProcess = 0;
    function getSubProcess(updateProcess)
    {
        
        if(currentProcess < updateProcess) {
            currentProcess = updateProcess;
        }else{
            if(currentProcess < 99){
                if(currentProcess < 85){
                    var r = Math.ceil(Math.random()*10) + 3;
                    currentProcess = currentProcess + r;
                } else{
                    currentProcess+=1;
                }
            }
        }
    
        return currentProcess;
    }
})();





function updateConvertProgress(percent) {
    let svg = document.querySelector('.svg-loading');
    let progress = svg.querySelector('.progress');
    let progressText = svg.querySelector('.progress-text');
    let totalLength = progress.getTotalLength();
    progress.style.strokeDasharray = (totalLength * (percent / 100)) + ', ' + totalLength;
    progressText.textContent = parseInt(percent) + '%';
}

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
