import _ from 'lodash'

export function toggleClassInBody(className) {

    var bodyClass = document.body.className;
    var bodyClass = bodyClass.indexOf(className) == -1
        ? addSafely(bodyClass, className)
        : replaceSafely(bodyClass, className)

    document.body.className = bodyClass;
}

function addSafely(bodyClass, className) {
    return bodyClass.length > 0 
        ? " " + className
        : className
}


function replaceSafely(bodyClass, className) {
    var str = (bodyClass === className)
        ? className
        : " " + className

    return _.replace(bodyClass, str, '')
}