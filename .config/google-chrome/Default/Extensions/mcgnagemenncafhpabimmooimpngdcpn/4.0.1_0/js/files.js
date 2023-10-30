(async function() {
    chrome.action.setPopup({
        popup: 'files.html'
    });

    if (window.frames.length != parent.frames.length) {
        let mainBox = document.querySelector(".main-box");
       mainBox.classList.add('convert_match');
       mainBox.classList.add('convert_file_match');
    }
    
    updateFileCount();

    checkUser().then(status => {
        if (status) {
            document.querySelector('.loginbtn').classList.add('hide');
            document.querySelector('.userface').classList.remove('hide');
        }
    });
    
    let elFilesBox = document.querySelector('.files-box');
    let files = await getFileList();

  
    let time = new Date().getTime();
    for (let i in files) {
        let file = files[i];
        if (window.frames.length != parent.frames.length) {
            if(i == 0){
                elFilesBox.innerHTML = templateFile(getFileIcon(getFileExt(file.name)), file.show_name, getDownload(file))
            }
            return;
        }
        let id = 'file-' + i;
        let temp = document.importNode( document.querySelector('#file-temp').content, true);
        let tempTop = document.querySelector("#file-temp-top");
        temp.querySelector('.file-item').setAttribute('id', id);
        temp.querySelector('.icon img').setAttribute('src', getFileIcon(getFileExt(file.name)));
        temp.querySelector('.name').textContent = file.show_name;
        temp.querySelector('.size').textContent = getFileSize(file.size);
        if (!file.expired || time >= file.expired) {
            temp.querySelector('.file-item').classList.add('deleted');
            temp.querySelector('.icon img').classList.add('gray');
            temp.querySelector('.download img').classList.add('gray');
            // temp.querySelector('.remove img').classList.add('gray');
            temp.querySelector('.edit img').classList.add('gray');
            temp.querySelector('.download').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            temp.querySelector('.edit').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            temp.querySelector('.view').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        } else {
            // temp.querySelector('.edit').setAttribute('href', getEditUrl(file));
            // temp.querySelector('.view').setAttribute('href', getViewUrl(file));
            temp.querySelector('.edit').classList.add('hide');
            temp.querySelector('.view').classList.add('hide');
            temp.querySelector('.download').setAttribute('href', getDownload(file));
            // temp.querySelector('.download').addEventListener('click', () => {
            //     chrome.tabs.create({
            //         url: getDownload(file)
            //     });
            // });
        }
        temp.querySelector('.remove').addEventListener('click', () => {
            removeFile(id);
            document.getElementById(id).remove();
            updateFileCount();
        });
        
        let a = await isEditView(file.task,file);
        if( !a.status){
            temp.querySelector('.edit').classList.add('hide');
            tempTop.querySelector('.item_top_edit').classList.add('hide');
            temp.querySelector('.view').classList.add('hide');
            tempTop.querySelector('.item_top_view').classList.add('hide');
            tempTop.querySelector('.item_top_down').style.width = '49%';
            tempTop.querySelector('.item_top_del').style.width = '49%';
            temp.querySelector('.download').style.width = '49%';
            temp.querySelector('.remove').style.width = '49%';
        }
       
        elFilesBox.appendChild(temp);
    }
    
    const elHours = document.querySelector('.time-hours');
    const elMinutes = document.querySelector('.time-minutes');
    const elSeconds = document.querySelector('.time-seconds');

    
    let intervalId = setInterval(async () => {
        let file = await getFile(0);
       
        if (!file) {
            return;
        }
        let time = timeLeft(file.expired);
        if (!time) {
            elHours.textContent = '0';
            elMinutes.textContent = '0';
            elSeconds.textContent = '0';
            clearInterval(intervalId);
        } else {
            elHours.textContent = time.hours;
            elMinutes.textContent = time.minutes;
            elSeconds.textContent = time.seconds;
        }
    }, 1000);

    setRateUs();
})();

function timeLeft(expireTime) {
    let current = new Date().getTime();
    if (current >= expireTime) {
        return false;
    }
    let _time = (expireTime - current) / 1000;
    let hours = Math.floor(_time / 3600);
    let minutes = Math.floor(_time % 3600 / 60);
    let seconds = Math.round(_time % 3600 % 60);
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}


function templateFile(fileImg,filename,downloadUrl){
    return `<div class="filebox">
        <div class="file_img">
            <img width="50" height="50" src="${fileImg}" alt="file images">
        </div>
        <div class="file_name">
            ${filename}
        </div>
        <div class="download_btn">
            <a href="${downloadUrl}" target="_blank">
                <svg aria-hidden="true" width="20" height="20" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" class=""></path>
                </svg>   
                <span>
                    Download
                </span>
            </a>
        </div>
    </div>`
}