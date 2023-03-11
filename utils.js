const $ = (selector) => {
    return document.querySelector(selector)
}
const $$ = (selector) => {
    return document.querySelectorAll(selector)
}
const createElement = (tagname, clasname, content) => {
    const newElement = document.createElement(tagname)
    if (clasname) {
        newElement.setAttribute("class", clasname)
    }
    if (content) {
        newElement.innerHTML = content
    }
    return newElement
}