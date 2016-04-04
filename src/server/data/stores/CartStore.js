import _ from 'lodash'

export class Item extends Object {}
export class Viewer extends Object {}
export class Cart extends Object {}
export class Category extends Object {}
export class SubCategory extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var cartStore = []

const usersById = {
    [VIEWER_ID]: viewer
};

export function initState(items) {
    cartStore = items
    return cartStore
}

export function getById(id) {

    var item = cartStore.filter((elt) => {
        if(elt.id == id) {
            return elt
        }
    })

    return item[0]
}

export function getViewer() {
   return usersById[VIEWER_ID]
}

export function isInitialized() {
    if(cartStore.length === 0) {
        return false
    } else {
        return true
    }
}

export function getCart() {
    return cartStore
}

export function pushItemInCart(item) {

    var itemFiltered = cartStore.filter((elt) => {
        if(elt == item) {
            return elt
        }
    })

    if(!itemFiltered[0]) {
        cartStore.push(item)
    }
}

export function removeItemFromCart(reference) {

    return _.remove(cartStore, (item) => {
        return item.reference == reference
    })
}
