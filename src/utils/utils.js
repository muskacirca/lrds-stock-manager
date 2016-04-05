import _ from 'lodash'

export function toggleClassInBody(className) {

    var bodyClass = document.body.className;
    var bodyClass = bodyClass.indexOf(className) == -1
        ? bodyClass + className
        : _.replace(bodyClass, className, '')

    document.body.className = bodyClass;
}
