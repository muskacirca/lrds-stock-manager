import Database from '../database'

export class Viewer extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var users = {}

const usersById = {
    [VIEWER_ID]: viewer
};

export function registerViewer(viewer) {
    
    if(users[viewer.id] == undefined) {
        users[viewer.id] = viewer
    }
}

export function getViewer(viewerId) {

    console.log("getViewer with Id : " + viewerId)
    console.log("getViewer : " + JSON.stringify(users[viewerId]))
    
    return users[viewerId] == undefined 
        ? Database.models.user.findOne({where: {id: viewerId}}) 
        : users[viewerId]
}