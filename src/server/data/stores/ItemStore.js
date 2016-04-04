import _ from 'lodash'

export class Item extends Object {}
export class Viewer extends Object {}
export class Domain extends Object {}
export class Category extends Object {}
export class SubCategory extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var itemsStore = []

const usersById = {
    [VIEWER_ID]: viewer
};

export function initState(items) {

    //var typedWrecks = wrecks.map((elt) => {
    //    const todo = new Wreck();
    //    Object.assign(todo, elt);
    //    return todo
    //})

    itemsStore = items
    return itemsStore
}

export function getById(id) {

    var item = itemsStore.filter((elt) => {
        if(elt.id == id) {
            return elt
        }
    })

    return item[0]
}

export function getSubCategoryById(id) {

    return {name: "SUB_CATEGORY"}
}

export function getViewer() {

    console.log("getting viewer : " + JSON.stringify(usersById[VIEWER_ID]))
   return usersById[VIEWER_ID]
}

export function getSubcategory() {

    console.log("getting viewer : " + JSON.stringify(usersById[VIEWER_ID]))
    return usersById[VIEWER_ID]
}

export function isInitialized() {
    if(itemsStore.length === 0) {
        return false
    } else {
        return true
    }
}

export function getItems() {

    console.log("itemsStore: " + itemsStore.length)

    return itemsStore
}

export function pushItem(item) {

    var itemFiltered = itemsStore.filter((elt) => {
        if(elt.id == item.id) {
            return elt
        }
    })

    if(!itemFiltered[0]) itemsStore.push(item)
}
