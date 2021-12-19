module.exports = (temp,entry) => {
    let output = temp.replace(/{%BOOKNAME%}/g,entry.title)
    output = output.replace(/{%BOOKIMAGE%}/g,entry.image)
    output = output.replace(/{%BOOKID%}/g,entry.id)
    output = output.replace(/{%BOOKPRICE%}/g,entry.price)
    output = output.replace(/{%BOOKSUBTITILE%}/g,entry.subtitle)
    output = output.replace(/{%BOOKDESCRIP%}/g,entry.description)
    output = output.replace(/{%BOOKNO%}/g,entry.isbn13)
    output = output.replace(/{%BOOKURL%}/g,entry.url)
    return output
}