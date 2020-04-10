import fetch from 'isomorphic-fetch';
import { apiLink } from '../../data/apiLinks';

//  It is best practice to create constants for all of your actions so that
//  both the action creators (the functions listed here) and the reducers can
//  use them. This way you won’t have discrepancies between the strings.
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT_BY_SLUG = 'GET_PROJECT_BY_SLUG';
export const GET_CONTRIBUTORS_BY_ID = 'GET_CONTRIBUTORS_BY_ID';
export const SET_CONTRIBUTORS = 'SET_CONTRIBUTORS';

// The fetch recipes handles all of the logic for
// making a request to the server for the project data.
export function fetchProjects() {
  return dispatch => {
    return fetch(apiLink.projects, { // Implement the fetch API for making a GET request to the appropriate endpoint.
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        return dispatch({  // Dispatch the action.
          type: GET_PROJECTS,  // Type is the only required property of every action.
          data: data  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
export function fetchProjectBySlug(slug) {
  return dispatch => {
    return fetch(apiLink.projectBySlug(slug), { // Implement the fetch API for making a GET request to the appropriate endpoint.
      method: 'GET'
    }).then((response) => {
      if(response.length===0) return;
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        if(data.length===0) return;
        return dispatch({  // Dispatch the action.
          type: GET_PROJECT_BY_SLUG,  // Type is the only required property of every action.
          data: data.pop()  // Attach the JSON data to the action payload on a property called data.
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
export function fetchContributorsByIds(contributorIds) {
  return dispatch => {
    return fetch(apiLink.usersByIds(contributorIds), {
      method: 'GET'
    }).then((response) => {
      if(response.length===0) return;
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        if(data.length===0) return;
        return dispatch({  // Dispatch the action.
          type: GET_CONTRIBUTORS_BY_ID,
          data: data
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
// This action creator composes the other two action creators making it easier
// for the view and server to request the related data.
export function getHomePageData() {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjects())
    ])
  }
}
export function getProjectPageData(slug) {
  return (dispatch, getState) => {
    return Promise.all([
      dispatch(fetchProjectBySlug(slug))
    ])
  }
}
export function setContributors(contributors) {
  return {  // Dispatch the action.
    type: SET_CONTRIBUTORS,
    data: contributors
  };
}

//TODO add checks for existence of data so that things don't get rerequested on the browser
