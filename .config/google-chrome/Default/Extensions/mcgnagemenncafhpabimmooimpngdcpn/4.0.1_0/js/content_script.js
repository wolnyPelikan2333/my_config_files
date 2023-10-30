window.addEventListener('message', function (e) {
    // if (e.origin != 'https://qwerpdf.com' && e.origin != 'https://www.qwerpdf.com') {
    //     return false;
    // }
    if (localStorage.getItem('__debug')) {
        console.log('Content script receiving: ');
        console.log(e);
    }
    if (e.data.evt == 'popup') {
        openPopup();
    } else if (e.data.evt == 'close_popup') {
        closePopup();
    }

    if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(e.data, (res) => {
            if (chrome.runtime.lastError) {
                
            }
    
            if (localStorage.getItem('__debug')) {
                console.log('Content script sending: ');
                console.log(sender);
            }
        });
    }
});

chrome.runtime.onMessage.addListener(request => {
    if (request.evt == 'popup') {
        openPopup();
    }
    return true;
});


let domain = 'https://qwerpdf.com';

let lang = chrome.i18n.getUILanguage().toLowerCase();
switch (lang) {
  case "zh-tw":
  case "zh-hk": lang = "zh-ft"; break;
  case "zh-cn": break;

  default: lang = lang.split('-')[0];
}
if (![ "en", "es", "fr", "de", "it", "pt", "pl", "da", "nl", "fi", "cs", "sv", "no", "ro", "ru", "el", "id", "zh-cn", "zh-ft", "ja", "ko", "th", "tr"].includes(lang)) {
  lang = "en";
}
lang= lang== "en"?"":"/"+lang;
const utm = '?utm_source=E-ADPC&utm_medium=EXT&utm_campaign=Embedded';
let pageIndex = {
    url: domain,
    page: 'index.html',
    title: 'QWER PDF'
};
let pagePdfToWord = {
    url: domain +lang+ '/pdf-to-word.html'+utm,
    page: 'upload.html?f=pdf&t=word',
    title: ' - QWERPDF.com'
};
let pagePdfToExcel = {
    url: domain +lang+ '/pdf-to-excel.html'+utm,
    page: 'upload.html?f=pdf&t=excel',
    title: ' - QWERPDF.com'
};
let pagePdfToPPT = {
    url: domain +lang+ '/pdf-to-ppt.html'+utm,
    page: 'upload.html?f=pdf&t=ppt',
    title: ' - QWERPDF.com'
};
let pageWordToPdf = {
    url: domain +lang+ '/word-to-pdf.html'+utm,
    page: 'upload.html?f=word&t=pdf',
    title: ' - QWERPDF.com'
};
let pageExcelToPdf = {
    url: domain +lang+ '/excel-to-pdf.html'+utm,
    page: 'upload.html?f=excel&t=pdf',
    title: ' - QWERPDF.com'
};
let pagePPTToPdf = {
    url: domain +lang+ '/ppt-to-pdf.html'+utm,
    page: 'upload.html?f=ppt&t=pdf',
    title: ' - QWERPDF.com'
};
let keywords = {

    //en
    'PDF Converter': pageIndex,
    'PDF to Word': pagePdfToWord,
    'PDF to DOCX': pagePdfToWord,
    'PDF to DOC': pagePdfToWord,
    'PDF to editable word': pagePdfToWord,
    'PDF to Excel': pagePdfToExcel,
    'PDF to XLSX': pagePdfToExcel,
    'PDF to XLS': pagePdfToExcel,
    'PDF to Spreadsheet':pagePdfToExcel,
    'PDF to Powerpoint': pagePdfToPPT,
    'PDF to PPT': pagePdfToPPT,
    'PDF to PPTX': pagePdfToPPT,
    'PDF to Slides': pagePdfToPPT,
    'PDF to Slideshow': pagePdfToPPT,
    'Word to PDF': pageWordToPdf,
    'DOCX to PDF': pageWordToPdf,
    'DOC to PDF': pageWordToPdf,
    'Excel to PDF': pageExcelToPdf,
    'XLSX to PDF': pageExcelToPdf,
    'XLS to PDF': pageExcelToPdf,
    'Spreadsheet to PDF': pageExcelToPdf,
    'Powerpoint to PDF': pagePPTToPdf,
    'PPT to PDF': pagePPTToPdf,
    'PPTX to PDF': pagePPTToPdf,
    'Slides to PDF': pagePPTToPdf,
    'Slideshow to PDF': pagePPTToPdf,

//es
    'PDF a Word': pagePdfToWord,
    'PDF a DOCX': pagePdfToWord,
    'PDF a DOC': pagePdfToWord,
    'PDF a Excel': pagePdfToExcel,
    'PDF a XLSX': pagePdfToExcel,
    'PDF a XLS': pagePdfToExcel,
    'PDF a Powerpoint': pagePdfToPPT,
    'PDF a PPT': pagePdfToPPT,
    'PDF a PPTX': pagePdfToPPT,
    'Word a PDF': pageWordToPdf,
    'DOCX a PDF': pageWordToPdf,
    'DOC a PDF': pageWordToPdf,
    'Excel a PDF': pageExcelToPdf,
    'XLSX a PDF': pageExcelToPdf,
    'XLS a PDF': pageExcelToPdf,
    'Powerpoint a PDF': pagePPTToPdf,
    'PPT a PDF': pagePPTToPdf,
    'PPTX a PDF': pagePPTToPdf,

    //fr
    'PDF en Word': pagePdfToWord,
    'PDF en DOCX': pagePdfToWord,
    'PDF en DOC': pagePdfToWord,
    'PDF en Excel': pagePdfToExcel,
    'PDF en XLSX': pagePdfToExcel,
    'PDF en XLS': pagePdfToExcel,
    'PDF en Powerpoint': pagePdfToPPT,
    'PDF en PPT': pagePdfToPPT,
    'PDF en PPTX': pagePdfToPPT,
    'Word en PDF': pageWordToPdf,
    'DOCX en PDF': pageWordToPdf,
    'DOC en PDF': pageWordToPdf,
    'Excel en PDF': pageExcelToPdf,
    'XLSX en PDF': pageExcelToPdf,
    'XLS en PDF': pageExcelToPdf,
    'Powerpoint en PDF': pagePPTToPdf,
    'PPT en PDF': pagePPTToPdf,
    'PPTX en PDF': pagePPTToPdf,

     //de it
     'PDF in Word': pagePdfToWord,
     'PDF in DOCX': pagePdfToWord,
     'PDF in DOC': pagePdfToWord,
     'PDF in Excel': pagePdfToExcel,
     'PDF in XLSX': pagePdfToExcel,
     'PDF in XLS': pagePdfToExcel,
     'PDF in Powerpoint': pagePdfToPPT,
     'PDF in PPT': pagePdfToPPT,
     'PDF in PPTX': pagePdfToPPT,
    'Word in PDF': pageWordToPdf,
    'DOCX in PDF': pageWordToPdf,
    'DOC in PDF': pageWordToPdf,
    'Excel in PDF': pageExcelToPdf,
    'XLSX in PDF': pageExcelToPdf,
    'XLS in PDF': pageExcelToPdf,
    'Powerpoint in PDF': pagePPTToPdf,
    'PPT in PDF': pagePPTToPdf,
    'PPTX in PDF': pagePPTToPdf,

    //pt
    'PDF para Word': pagePdfToWord,
    'PDF para DOCX': pagePdfToWord,
    'PDF para DOC': pagePdfToWord,
    'PDF para Excel': pagePdfToExcel,
    'PDF para XLSX': pagePdfToExcel,
    'PDF para XLS': pagePdfToExcel,
    'PDF para Powerpoint': pagePdfToPPT,
    'PDF para PPT': pagePdfToPPT,
    'PDF para PPTX': pagePdfToPPT,
    'Word para PDF': pageWordToPdf,
    'DOCX para PDF': pageWordToPdf,
    'DOC para PDF': pageWordToPdf,
    'Excel para PDF': pageExcelToPdf,
    'XLSX para PDF': pageExcelToPdf,
    'XLS para PDF': pageExcelToPdf,
    'Powerpoint para PDF': pagePPTToPdf,
    'PPT para PDF': pagePPTToPdf,
    'PPTX para PDF': pagePPTToPdf,

     //nl
    'PDF na Word': pagePdfToWord,
    'PDF na DOCX': pagePdfToWord,
    'PDF na DOC': pagePdfToWord,
    'PDF na Excel': pagePdfToExcel,
    'PDF na XLSX': pagePdfToExcel,
    'PDF na XLS': pagePdfToExcel,
    'PDF na Powerpoint': pagePdfToPPT,
    'PDF na PPT': pagePdfToPPT,
    'PDF na PPTX': pagePdfToPPT,
    'Word na PDF': pageWordToPdf,
    'DOCX na PDF': pageWordToPdf,
    'DOC na PDF': pageWordToPdf,
    'Excel na PDF': pageExcelToPdf,
    'XLSX na PDF': pageExcelToPdf,
    'XLS na PDF': pageExcelToPdf,
    'Powerpoint na PDF': pagePPTToPdf,
    'PPT na PDF': pagePPTToPdf,
    'PPTX na PDF': pagePPTToPdf,
    'PDF do Word': pagePdfToWord,
    'PDF do DOCX': pagePdfToWord,
    'PDF do DOC': pagePdfToWord,
    'PDF do Excel': pagePdfToExcel,
    'PDF do XLSX': pagePdfToExcel,
    'PDF do XLS': pagePdfToExcel,
    'PDF do Powerpoint': pagePdfToPPT,
    'PDF do PPT': pagePdfToPPT,
    'PDF do PPTX': pagePdfToPPT,
    'Word do PDF': pageWordToPdf,
    'DOCX do PDF': pageWordToPdf,
    'DOC do PDF': pageWordToPdf,
    'Excel do PDF': pageExcelToPdf,
    'XLSX do PDF': pageExcelToPdf,
    'XLS do PDF': pageExcelToPdf,
    'Powerpoint do PDF': pagePPTToPdf,
    'PPT do PDF': pagePPTToPdf,
    'PPTX do PDF': pagePPTToPdf,

     //da no 
    'PDF til Word': pagePdfToWord,
    'PDF til DOCX': pagePdfToWord,
    'PDF til DOC': pagePdfToWord,
    'PDF til Excel': pagePdfToExcel,
    'PDF til XLSX': pagePdfToExcel,
    'PDF til XLS': pagePdfToExcel,
    'PDF til Powerpoint': pagePdfToPPT,
    'PDF til PPT': pagePdfToPPT,
    'PDF til PPTX': pagePdfToPPT,
    'Word til PDF': pageWordToPdf,
    'DOCX til PDF': pageWordToPdf,
    'DOC til PDF': pageWordToPdf,
    'Excel til PDF': pageExcelToPdf,
    'XLSX til PDF': pageExcelToPdf,
    'XLS til PDF': pageExcelToPdf,
    'Powerpoint til PDF': pagePPTToPdf,
    'PPT til PDF': pagePPTToPdf,
    'PPTX til PDF': pagePPTToPdf,

     //nl
    'PDF naar Word': pagePdfToWord,
    'PDF naar DOCX': pagePdfToWord,
    'PDF naar DOC': pagePdfToWord,
    'PDF naar Excel': pagePdfToExcel,
    'PDF naar XLSX': pagePdfToExcel,
    'PDF naar XLS': pagePdfToExcel,
    'PDF naar Powerpoint': pagePdfToPPT,
    'PDF naar PPT': pagePdfToPPT,
    'PDF naar PPTX': pagePdfToPPT,
    'Word naar PDF': pageWordToPdf,
    'DOCX naar PDF': pageWordToPdf,
    'DOC naar PDF': pageWordToPdf,
    'Excel naar PDF': pageExcelToPdf,
    'XLSX naar PDF': pageExcelToPdf,
    'XLS naar PDF': pageExcelToPdf,
    'Powerpoint naar PDF': pagePPTToPdf,
    'PPT naar PDF': pagePPTToPdf,
    'PPTX naar PDF': pagePPTToPdf,


     //fi
    'PDF Wordiksi': pagePdfToWord,
    'PDF DOCXiksi': pagePdfToWord,
    'PDF DOCiksi': pagePdfToWord,
    'PDF Exceliksi': pagePdfToExcel,
    'PDF XLSXiksi': pagePdfToExcel,
    'PDF XLSiksi': pagePdfToExcel,
    'PDF Powerpointiksi': pagePdfToPPT,
    'PDF PPTiksi': pagePdfToPPT,
    'PDF PPTXiksi': pagePdfToPPT,
    'Word PDFiksi': pageWordToPdf,
    'DOCX PDFiksi': pageWordToPdf,
    'DOC PDFiksi': pageWordToPdf,
    'Excel PDFiksi': pageExcelToPdf,
    'XLSX PDFiksi': pageExcelToPdf,
    'XLS PDFiksi': pageExcelToPdf,
    'Powerpoint PDFiksi': pagePPTToPdf,
    'PPT PDFiksi': pagePPTToPdf,
    'PPTX PDFiksi': pagePPTToPdf,
    'PDF Word: ksi': pagePdfToWord,
    'PDF DOCX: ksi': pagePdfToWord,
    'PDF DOC: ksi': pagePdfToWord,
    'PDF Excel: ksi': pagePdfToExcel,
    'PDF XLSX: ksi': pagePdfToExcel,
    'PDF XLS: ksi': pagePdfToExcel,
    'PDF Powerpoint: ksi': pagePdfToPPT,
    'PDF PPT: ksi': pagePdfToPPT,
    'PDF PPTX: ksi': pagePdfToPPT,
    'Word PDF: ksi': pageWordToPdf,
    'DOCX PDF: ksi': pageWordToPdf,
    'DOC PDF: ksi': pageWordToPdf,
    'Excel PDF: ksi': pageExcelToPdf,
    'XLSX PDF: ksi': pageExcelToPdf,
    'XLS PDF: ksi': pageExcelToPdf,
    'Powerpoint PDF: ksi': pagePPTToPdf,
    'PPT PDF: ksi': pagePPTToPdf,
    'PPTX PDF: ksi': pagePPTToPdf,

     //sv
    'PDF till Word': pagePdfToWord,
    'PDF till DOCX': pagePdfToWord,
    'PDF till DOC': pagePdfToWord,
    'PDF till Excel': pagePdfToExcel,
    'PDF till XLSX': pagePdfToExcel,
    'PDF till XLS': pagePdfToExcel,
    'PDF till Powerpoint': pagePdfToPPT,
    'PDF till PPT': pagePdfToPPT,
    'PDF till PPTX': pagePdfToPPT,
    'Word till PDF': pageWordToPdf,
    'DOCX till PDF': pageWordToPdf,
    'DOC till PDF': pageWordToPdf,
    'Excel till PDF': pageExcelToPdf,
    'XLSX till PDF': pageExcelToPdf,
    'XLS till PDF': pageExcelToPdf,
    'Powerpoint till PDF': pagePPTToPdf,
    'PPT till PDF': pagePPTToPdf,
    'PPTX till PDF': pagePPTToPdf,

     //ro
    'PDF în Word': pagePdfToWord,
    'PDF în DOCX': pagePdfToWord,
    'PDF în DOC': pagePdfToWord,
    'PDF în Excel': pagePdfToExcel,
    'PDF în XLSX': pagePdfToExcel,
    'PDF în XLS': pagePdfToExcel,
    'PDF în Powerpoint': pagePdfToPPT,
    'PDF în PPT': pagePdfToPPT,
    'PDF în PPTX': pagePdfToPPT,
    'Word în PDF': pageWordToPdf,
    'DOCX în PDF': pageWordToPdf,
    'DOC în PDF': pageWordToPdf,
    'Excel în PDF': pageExcelToPdf,
    'XLSX în PDF': pageExcelToPdf,
    'XLS în PDF': pageExcelToPdf,
    'Powerpoint în PDF': pagePPTToPdf,
    'PPT în PDF': pagePPTToPdf,
    'PPTX în PDF': pagePPTToPdf,

     //ru
    'PDF в Word': pagePdfToWord,
    'PDF в DOCX': pagePdfToWord,
    'PDF в DOC': pagePdfToWord,
    'PDF в Excel': pagePdfToExcel,
    'PDF в XLSX': pagePdfToExcel,
    'PDF в XLS': pagePdfToExcel,
    'PDF в Powerpoint': pagePdfToPPT,
    'PDF в PPT': pagePdfToPPT,
    'PDF в PPTX': pagePdfToPPT,
    'Word в PDF': pageWordToPdf,
    'DOCX в PDF': pageWordToPdf,
    'DOC в PDF': pageWordToPdf,
    'Excel в PDF': pageExcelToPdf,
    'XLSX в PDF': pageExcelToPdf,
    'XLS в PDF': pageExcelToPdf,
    'Powerpoint в PDF': pagePPTToPdf,
    'PPT в PDF': pagePPTToPdf,
    'PPTX в PDF': pagePPTToPdf,

     //el
    'PDF σε Word': pagePdfToWord,
    'PDF σε DOCX': pagePdfToWord,
    'PDF σε DOC': pagePdfToWord,
    'PDF σε Excel': pagePdfToExcel,
    'PDF σε XLSX': pagePdfToExcel,
    'PDF σε XLS': pagePdfToExcel,
    'PDF σε Powerpoint': pagePdfToPPT,
    'PDF σε PPT': pagePdfToPPT,
    'PDF σε PPTX': pagePdfToPPT,
    'Word σε PDF': pageWordToPdf,
    'DOCX σε PDF': pageWordToPdf,
    'DOC σε PDF': pageWordToPdf,
    'Excel σε PDF': pageExcelToPdf,
    'XLSX σε PDF': pageExcelToPdf,
    'XLS σε PDF': pageExcelToPdf,
    'Powerpoint σε PDF': pagePPTToPdf,
    'PPT σε PDF': pagePPTToPdf,
    'PPTX σε PDF': pagePPTToPdf,

     //id
    'PDF ke Word': pagePdfToWord,
    'PDF ke DOCX': pagePdfToWord,
    'PDF ke DOC': pagePdfToWord,
    'PDF ke Excel': pagePdfToExcel,
    'PDF ke XLSX': pagePdfToExcel,
    'PDF ke XLS': pagePdfToExcel,
    'PDF ke Powerpoint': pagePdfToPPT,
    'PDF ke PPT': pagePdfToPPT,
    'PDF ke PPTX': pagePdfToPPT,
    'Word ke PDF': pageWordToPdf,
    'DOCX ke PDF': pageWordToPdf,
    'DOC ke PDF': pageWordToPdf,
    'Excel ke PDF': pageExcelToPdf,
    'XLSX ke PDF': pageExcelToPdf,
    'XLS ke PDF': pageExcelToPdf,
    'Powerpoint ke PDF': pagePPTToPdf,
    'PPT ke PDF': pagePPTToPdf,
    'PPTX ke PDF': pagePPTToPdf,

     //zh-cn
    'PDF 转 Word': pagePdfToWord,
    'PDF 转 DOCX': pagePdfToWord,
    'PDF 转 DOC': pagePdfToWord,
    'PDF 转 Excel': pagePdfToExcel,
    'PDF 转 XLSX': pagePdfToExcel,
    'PDF 转 XLS': pagePdfToExcel,
    'PDF 转 Powerpoint': pagePdfToPPT,
    'PDF 转 PPT': pagePdfToPPT,
    'PDF 转 PPTX': pagePdfToPPT,
    'Word 转 PDF': pageWordToPdf,
    'DOCX 转 PDF': pageWordToPdf,
    'DOC 转 PDF': pageWordToPdf,
    'Excel 转 PDF': pageExcelToPdf,
    'XLSX 转 PDF': pageExcelToPdf,
    'XLS 转 PDF': pageExcelToPdf,
    'Powerpoint 转 PDF': pagePPTToPdf,
    'PPT 转 PDF': pagePPTToPdf,
    'PPTX 转 PDF': pagePPTToPdf,
    'PDF转Word': pagePdfToWord,
    'PDF转DOCX': pagePdfToWord,
    'PDF转DOC': pagePdfToWord,
    'PDF转Excel': pagePdfToExcel,
    'PDF转XLSX': pagePdfToExcel,
    'PDF转XLS': pagePdfToExcel,
    'PDF转Powerpoint': pagePdfToPPT,
    'PDF转PPT': pagePdfToPPT,
    'PDF转PPTX': pagePdfToPPT,
    'Word转PDF': pageWordToPdf,
    'DOCX转PDF': pageWordToPdf,
    'DOC转PDF': pageWordToPdf,
    'Excel转PDF': pageExcelToPdf,
    'XLSX转PDF': pageExcelToPdf,
    'XLS转PDF': pageExcelToPdf,
    'Powerpoint转PDF': pagePPTToPdf,
    'PPT转PDF': pagePPTToPdf,
    'PPTX转PDF': pagePPTToPdf,

    //zh-cn
    'PDF 转 Word': pagePdfToWord,
    'PDF 转 DOCX': pagePdfToWord,
    'PDF 转 DOC': pagePdfToWord,
    'PDF 转 Excel': pagePdfToExcel,
    'PDF 转 XLSX': pagePdfToExcel,
    'PDF 转 XLS': pagePdfToExcel,
    'PDF 转 Powerpoint': pagePdfToPPT,
    'PDF 转 PPT': pagePdfToPPT,
    'PDF 转 PPTX': pagePdfToPPT,
    'Word 转 PDF': pageWordToPdf,
    'DOCX 转 PDF': pageWordToPdf,
    'DOC 转 PDF': pageWordToPdf,
    'Excel 转 PDF': pageExcelToPdf,
    'XLSX 转 PDF': pageExcelToPdf,
    'XLS 转 PDF': pageExcelToPdf,
    'Powerpoint 转 PDF': pagePPTToPdf,
    'PPT 转 PDF': pagePPTToPdf,
    'PPTX 转 PDF': pagePPTToPdf,
    'PDF转Word': pagePdfToWord,
    'PDF转DOCX': pagePdfToWord,
    'PDF转DOC': pagePdfToWord,
    'PDF转Excel': pagePdfToExcel,
    'PDF转XLSX': pagePdfToExcel,
    'PDF转XLS': pagePdfToExcel,
    'PDF转Powerpoint': pagePdfToPPT,
    'PDF转PPT': pagePdfToPPT,
    'PDF转PPTX': pagePdfToPPT,
    'Word转PDF': pageWordToPdf,
    'DOCX转PDF': pageWordToPdf,
    'DOC转PDF': pageWordToPdf,
    'Excel转PDF': pageExcelToPdf,
    'XLSX转PDF': pageExcelToPdf,
    'XLS转PDF': pageExcelToPdf,
    'Powerpoint转PDF': pagePPTToPdf,
    'PPT转PDF': pagePPTToPdf,
    'PPTX转PDF': pagePPTToPdf,

     //zh-cn
    'PDF 轉 Word': pagePdfToWord,
    'PDF 轉 DOCX': pagePdfToWord,
    'PDF 轉 DOC': pagePdfToWord,
    'PDF 轉 Excel': pagePdfToExcel,
    'PDF 轉 XLSX': pagePdfToExcel,
    'PDF 轉 XLS': pagePdfToExcel,
    'PDF 轉 Powerpoint': pagePdfToPPT,
    'PDF 轉 PPT': pagePdfToPPT,
    'PDF 轉 PPTX': pagePdfToPPT,
    'Word 轉 PDF': pageWordToPdf,
    'DOCX 轉 PDF': pageWordToPdf,
    'DOC 轉 PDF': pageWordToPdf,
    'Excel 轉 PDF': pageExcelToPdf,
    'XLSX 轉 PDF': pageExcelToPdf,
    'XLS 轉 PDF': pageExcelToPdf,
    'Powerpoint 轉 PDF': pagePPTToPdf,
    'PPT 轉 PDF': pagePPTToPdf,
    'PPTX 轉 PDF': pagePPTToPdf,
    'PDF轉Word': pagePdfToWord,
    'PDF轉DOCX': pagePdfToWord,
    'PDF轉DOC': pagePdfToWord,
    'PDF轉Excel': pagePdfToExcel,
    'PDF轉XLSX': pagePdfToExcel,
    'PDF轉XLS': pagePdfToExcel,
    'PDF轉Powerpoint': pagePdfToPPT,
    'PDF轉PPT': pagePdfToPPT,
    'PDF轉PPTX': pagePdfToPPT,
    'Word轉PDF': pageWordToPdf,
    'DOCX轉PDF': pageWordToPdf,
    'DOC轉PDF': pageWordToPdf,
    'Excel轉PDF': pageExcelToPdf,
    'XLSX轉PDF': pageExcelToPdf,
    'XLS轉PDF': pageExcelToPdf,
    'Powerpoint轉PDF': pagePPTToPdf,
    'PPT轉PDF': pagePPTToPdf,
    'PPTX轉PDF': pagePPTToPdf, 

     //ja
     'PDFからWord': pagePdfToWord,
     'PDFからDOCX': pagePdfToWord,
     'PDFからDOC': pagePdfToWord,
     'PDFからExcel': pagePdfToExcel,
     'PDFからXLSX': pagePdfToExcel,
     'PDFからXLS': pagePdfToExcel,
     'PDFからPowerpoint': pagePdfToPPT,
     'PDFからPPT': pagePdfToPPT,
     'PDFからPPTX': pagePdfToPPT,
     'WordからPDF': pageWordToPdf,
     'DOCXからPDF': pageWordToPdf,
     'DOCからPDF': pageWordToPdf,
     'ExcelからPDF': pageExcelToPdf,
     'XLSXからPDF': pageExcelToPdf,
     'XLSからPDF': pageExcelToPdf,
     'PowerpointからPDF': pagePPTToPdf,
     'PPTからPDF': pagePPTToPdf,
     'PPTXからPDF': pagePPTToPdf,

     //ko
     'PDF Word 로 변환': pagePdfToWord,
     'PDF DOCX 로 변환': pagePdfToWord,
     'PDF DOC 로 변환': pagePdfToWord,
     'PDF Excel 로 변환': pagePdfToExcel,
     'PDF XLSX 로 변환': pagePdfToExcel,
     'PDF XLS 로 변환': pagePdfToExcel,
     'PDF Powerpoint 로 변환': pagePdfToPPT,
     'PDF PPT 로 변환': pagePdfToPPT,
     'PDF PPTX 로 변환': pagePdfToPPT,
     'Word PDF 로 변환': pageWordToPdf,
     'DOCX PDF 로 변환': pageWordToPdf,
     'DOC PDF 로 변환': pageWordToPdf,
     'Excel PDF 로 변환': pageExcelToPdf,
     'XLSX PDF 로 변환': pageExcelToPdf,
     'XLS PDF 로 변환': pageExcelToPdf,
     'Powerpoint PDF 로 변환': pagePPTToPdf,
     'PPT PDF 로 변환': pagePPTToPdf,
     'PPTX PDF 로 변환': pagePPTToPdf,
     'PDF Word로 변환': pagePdfToWord,
     'PDF DOCX로 변환': pagePdfToWord,
     'PDF DOC로 변환': pagePdfToWord,
     'PDF Excel로 변환': pagePdfToExcel,
     'PDF XLSX로 변환': pagePdfToExcel,
     'PDF XLS로 변환': pagePdfToExcel,
     'PDF Powerpoint로 변환': pagePdfToPPT,
     'PDF PPT로 변환': pagePdfToPPT,
     'PDF PPTX로 변환': pagePdfToPPT,
     'Word PDF로 변환': pageWordToPdf,
     'DOCX PDF로 변환': pageWordToPdf,
     'DOC PDF로 변환': pageWordToPdf,
     'Excel PDF로 변환': pageExcelToPdf,
     'XLSX PDF로 변환': pageExcelToPdf,
     'XLS PDF로 변환': pageExcelToPdf,
     'Powerpoint PDF로 변환': pagePPTToPdf,
     'PPT PDF로 변환': pagePPTToPdf,
     'PPTX PDF로 변환': pagePPTToPdf,
     
     //th
     'PDF เป็น Word': pagePdfToWord,
     'PDF เป็น DOCX': pagePdfToWord,
     'PDF เป็น DOC': pagePdfToWord,
     'PDF เป็น Excel': pagePdfToExcel,
     'PDF เป็น XLSX': pagePdfToExcel,
     'PDF เป็น XLS': pagePdfToExcel,
     'PDF เป็น Powerpoint': pagePdfToPPT,
     'PDF เป็น PPT': pagePdfToPPT,
     'PDF เป็น PPTX': pagePdfToPPT,
     'Word เป็น PDF': pageWordToPdf,
     'DOCX เป็น PDF': pageWordToPdf,
     'DOC เป็น PDF': pageWordToPdf,
     'Excel เป็น PDF': pageExcelToPdf,
     'XLSX เป็น PDF': pageExcelToPdf,
     'XLS เป็น PDF': pageExcelToPdf,
     'Powerpoint เป็น PDF': pagePPTToPdf,
     'PPT เป็น PDF': pagePPTToPdf,
     'PPTX เป็น PDF': pagePPTToPdf,

     //tr
     "PDF'den Word'e": pagePdfToWord,
     "PDF'den DOCX'e": pagePdfToWord,
     "PDF'den DOC'e": pagePdfToWord,
     "PDF'den Excel'e": pagePdfToExcel,
     "PDF'den XLSX'e": pagePdfToExcel,
     "PDF'den XLS'e": pagePdfToExcel,
     "PDF'den Powerpoint'e": pagePdfToPPT,
     "PDF'den PPT'e": pagePdfToPPT,
     "PDF'den PPTX'e": pagePdfToPPT,
     "Word'den PDF'ye": pageWordToPdf,
     "DOCX'den PDF'ye": pageWordToPdf,
     "DOC'den PDF'ye": pageWordToPdf,
     "Excel'den PDF'ye": pageExcelToPdf,
     "XLSX'den PDF'ye": pageExcelToPdf,
     "XLS'den PDF'ye": pageExcelToPdf,
     "Powerpoint'den PDF'ye": pagePPTToPdf,
     "PPT'den PDF'ye": pagePPTToPdf,
     "PPTX'den PDF'ye": pagePPTToPdf,
     
     //vn
     'PDF Sang Word': pagePdfToWord,
     'PDF Sang DOCX': pagePdfToWord,
     'PDF Sang DOC': pagePdfToWord,
     'PDF Sang Excel': pagePdfToExcel,
     'PDF Sang XLSX': pagePdfToExcel,
     'PDF Sang XLS': pagePdfToExcel,
     'PDF Sang Powerpoint': pagePdfToPPT,
     'PDF Sang PPT': pagePdfToPPT,
     'PDF Sang PPTX': pagePdfToPPT,
     'Word Sang PDF': pageWordToPdf,
     'DOCX Sang PDF': pageWordToPdf,
     'DOC Sang PDF': pageWordToPdf,
     'Excel Sang PDF': pageExcelToPdf,
     'XLSX Sang PDF': pageExcelToPdf,
     'XLS Sang PDF': pageExcelToPdf,
     'Powerpoint Sang PDF': pagePPTToPdf,
     'PPT Sang PDF': pagePPTToPdf,
     'PPTX Sang PDF': pagePPTToPdf,
    
};


if (window.location.host.toLowerCase().indexOf('google')) {
    chrome.storage.local.get('dont_show_again').then(obj => {
        if (!obj.dont_show_again) {
            let resBox = document.querySelector('#rso');
            if (resBox) {
               let searchValue = resBox.getAttribute('data-async-context').toLowerCase();
               searchValue = decodeURI(searchValue).replace('query:', '').trim();
               let match = null;
               let keys = Object.keys(keywords);
               let keyword=null;
               for (let key of keys) {
                   if (searchValue.indexOf(key.toLowerCase()) > -1) {
                       keyword=key;
                       match = keywords[key];
                       break;
                   }
               }
               if (match) {
                   let elFrame = document.createElement('iframe');
                   elFrame.style.minHeight="265px";
                   elFrame.style.height="auto";
                   elFrame.src = chrome.runtime.getURL(match.page);
                
                   let elDiv = document.createElement('div');
                   elDiv.classList.add('qwerpdf_inject');
                   elDiv.appendChild(elFrame);
                   resBox.insertAdjacentElement('afterbegin', elDiv);
       
                   let elTitle = document.createElement('div'); 
                   elTitle.style.paddingBottom = '10px';
                   elTitle.style.color = "#681da8";
                //    let elA = document.createElement('a');
                //    elA.setAttribute('href', match.url);
                   let elH3 = document.createElement('h3');
                //    elH3.textContent = keyword+match.title;
                   elH3.textContent = keyword;
                //    elA.appendChild(elH3);
                //    elTitle.appendChild(elA);
                   elTitle.appendChild(elH3);
                   elDiv.insertAdjacentElement('afterbegin', elTitle);
       
                   let elRow = document.createElement('div');
                   elRow.style.fontSize = '12px';
                   elRow.style.color = '#888';
                   elRow.style.display = 'flex';
                   elRow.style.justifyContent = 'space-between';
                   elDiv.appendChild(elRow);
       
                   let elSpanLeft = document.createElement('span');
                   elSpanLeft.textContent = "Don't show this again";
                   elSpanLeft.style.cursor = 'pointer';
                   elRow.appendChild(elSpanLeft);
                   elSpanLeft.addEventListener('click', () => {
                       chrome.storage.local.set({'dont_show_again': true});
                       elDiv.remove();
                   });
       
                   let elSpanRight = document.createElement('span');
                   elSpanRight.textContent = "Powered by QWERPDF";
                   elRow.appendChild(elSpanRight);
               }
            }
        }
    });
}


function openPopup() {
    let elFrame = document.createElement('iframe');
    elFrame.src = chrome.runtime.getURL('index_popup.html');
    elFrame.style.width = '100%';
    elFrame.style.height = '100vh';
    
    let elDiv = document.createElement('div');
    let closePopup = document.createElement('div');
    closePopup.innerHTML = '<svg t="1669631704563" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2681" width="20" height="20"><path fill="#c6d3c5" d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m-104.746667 256a8.533333 8.533333 0 0 1 6.037334 2.496L512 463.850667l98.688-98.688a8.533333 8.533333 0 0 1 6.037333-2.496h66.346667a8.533333 8.533333 0 0 1 6.037333 14.570666l-131.84 131.861334 137.642667 137.664a8.533333 8.533333 0 0 1-6.037333 14.570666h-66.346667a8.533333 8.533333 0 0 1-6.037333-2.496L512 554.346667l-104.512 104.490666a8.533333 8.533333 0 0 1-6.037333 2.496h-66.346667a8.533333 8.533333 0 0 1-6.016-14.570666l137.664-137.664-131.861333-131.861334A8.533333 8.533333 0 0 1 340.906667 362.666667h66.346666z" p-id="2682"></path></svg>'
    closePopup.style.cursor = 'pointer';
    closePopup.style.position = "absolute";
    closePopup.style.right = "10px";
    closePopup.style.top = "10px";
    elDiv.appendChild(closePopup)
    elDiv.style.zIndex = '9999';
    elDiv.setAttribute('id', '__qwerpdf_popup');
    elDiv.classList.add('qwerpdf_popup');
    elDiv.appendChild(elFrame);
    document.body.appendChild(elDiv);
    closePopup.addEventListener('click',function(){
        elDiv.remove();
    })
}

function closePopup() {
    document.querySelector('#__qwerpdf_popup').remove();
}