import _ from 'lodash'

export class Viewer extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var itemsStore = []

const usersById = {
    [VIEWER_ID]: viewer
};

export function initState(items) {
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

export function login(viewerId) {

}

export function getViewer(viewerId) {

    console.log("getting viewer : " + JSON.stringify(usersById[viewerId]))
   return usersById[viewerId]
}