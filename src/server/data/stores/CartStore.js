import _ from 'lodash'

var cartStore = {}

export function getById(id) {

    var item = cartStore.filter((elt) => {
        if(elt.id == id) {
            return elt
        }
    })

    return item[0]
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

    var cart = cartStore[viewerId]

    if(cart == undefined) {

        cartStore[viewerId] = [item]

    } else {

        var itemFiltered = cart.filter((elt) => {
            if(elt == item) {
                return elt
            }
        })

        if(!itemFiltered[0]) {
            cartStore[viewerId].push(item)
        }
    }
}

export function removeItemFromCart(viewerId, reference) {

    return _.remove(cartStore[viewerId], (item) => {
        return item.reference == reference
    })
}

export function emptyCart(viewerId) {

    cartStore[viewerId] = []
    return cartStore[viewerId]
}
