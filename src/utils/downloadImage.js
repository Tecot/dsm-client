import * as h2c from 'html2canvas'

const downloadImage2SVG = (selector) => {
    let dom = document.querySelector(selector)
    const svgString = new XMLSerializer().serializeToString(dom)
    const file = new Blob([svgString], { type: 'image/svg+xm' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-svg-file.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

const downloadImage2PNG = (selector) => {
    // h2c(document.querySelector(selector)).then()
}

// downloadSvg2Pdf(imageBase64, svg, outFileName = 'newplot.pdf') {
//     const img = new Image(); // 创建图片容器
//     img.src = imageBase64; //imageBase64 为svg+xml的Base64 文件流
//     img.onload = async () => {
//         const size = [img.width, img.height]; // 获取图片尺寸防止不完整
//         // const pdf = new jsPDF('portrait', 'cm', [21.0, 29.6]);
//         // const pdf = new jsPDF('l', 'pt', 'a4');
//         const pdf = new jsPDF('l', 'pt', size);
//         await pdf.svg(svg);
//         const uri = pdf.output('datauristring');
//         const link = document.createElement('a');
//         link.download = outFileName;
//         link.href = uri;
//         link.click();
//     }
// }