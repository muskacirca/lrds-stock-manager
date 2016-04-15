import _ from 'lodash'

export class Item extends Object {}
export class Viewer extends Object {}
export class Cart extends Object {}
export class Category extends Object {}
export class SubCategory extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var cartStore = {}

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

export function getCart(viewerId) {
    return cartStore[viewerId] == undefined ? [] : cartStore[viewerId]
}

export function pushItemInCart(viewerId, item) {

    console.log("pushItemInCart : " + JSON.stringify(cartStore))

    var cart = cartStore[viewerId]

    if(cart == undefined) {
        console.log("cart is undefined : " + JSON.stringify(cartStore))

        cartStore[viewerId] = [item]
        console.log("cart is undefined : " + JSON.stringify(cartStore))

    } else {

        console.log("cart is defined : " + JSON.stringify(cartStore))
        var itemFiltered = cart.filter((elt) => {
            if(elt == item) {
                return elt
            }
        })

        console.log("itemFiltered : " + JSON.stringify(itemFiltered))
        if(!itemFiltered[0]) {
            cartStore[viewerId].push(item)
        }
    }

    console.log("end of pushItemInCart : " + JSON.stringify(cartStore))
}

export function removeItemFromCart(viewerId, reference) {

    return _.remove(cartStore.get(viewerId), (item) => {
        return item.reference == reference
    })
}

export function emptyCart(viewerId) {

    cartStore = []
}
