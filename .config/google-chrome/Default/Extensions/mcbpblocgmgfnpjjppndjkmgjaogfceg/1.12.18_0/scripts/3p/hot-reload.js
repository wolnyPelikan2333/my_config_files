const filesInDirectory = dir => new Promise (resolve =>
    dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
            e.isDirectory
                ? filesInDirectory (e)
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
)

const isIgnoredFile = file => {
    const excludedFilesPattern = /^(fsCaptureList)|(fsProgress)|(fsOptions)|(fsCaptured)|(fireshot-chrome-plugin)|(sss-x64\.dat)|(sss\.dat)|(native-fireshot\.log)/i;
    return excludedFilesPattern.test(file);
}

const timestampForFilesInDirectory = dir =>
        filesInDirectory (dir).then (files =>
            files.filter(f => f.name && !isIgnoredFile(f.name)).map (f => f.name + f.lastModifiedDate).join ())

const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory (dir).then (timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            setTimeout (() => watchChanges (dir, timestamp), 1000) // retry after 1s
        } else {
            chrome.runtime.reload ()
        }
    })
}

chrome.management.getSelf (self => {
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
        chrome.tabs.query ({ active: true, lastFocusedWindow: true }, tabs => { 
            if (tabs[0]) {
                //chrome.tabs.reload (tabs[0].id)
            }
        })
    }
})
