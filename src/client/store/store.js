/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { computed, observable, action, autorun, toJS } from 'mobx';
import { State } from '../utils/viewer-state';
import { Viewer3dToggleSpaceModes } from '../components/projects/project/viewer3d/viewer-3d';

export default class Store {
  constructor() {
    autorun(() => console.log(this.report())); // eslint-disable-line no-console
  }

  report() {
    return toJS(this);
  }

  @observable user = null;

  @observable viewer3dState = null;

  @observable viewer3dDisplayMode = Viewer3dToggleSpaceModes.SHOW_ALL;

  @observable viewer2dState = null;

  @observable spaces = [];

  @observable selectedObjectIds = [];

  @computed get selectedObjectId() {
    return this.selectedObjectIds?.length === 1 ? this.selectedObjectIds[0] : null;
  }

  @observable projects = null;

  @observable currentProjectId = null;

  @observable detailsPanelOpen = false;

  @observable viewer3dTokenUrl = null;

  @action.bound
  setCurrentProjectId(projectId) {
    if (this.currentProjectId !== projectId) {
      this.currentProjectId = projectId;
      this.viewer3dTokenUrl = null;
      this.viewer3dState = State.NOT_INITIALIZED;
      this.viewer2dState = State.NOT_INITIALIZED;
      this.viewer3dDisplayMode = Viewer3dToggleSpaceModes.SHOW_ALL;
      this.detailsPanelOpen = false;
    }
  }

  @computed get project() {
    if (!this.projects || !this.currentProjectId) {
      return null;
    }
    return this.projects.find(project => project.id === this.currentProjectId);
  }

  @action.bound
  setUser(user) {
    this.user = user;
  }

  @action.bound
  setViewer3dTokenUrl(viewer3dTokenUrl) {
    this.viewer3dTokenUrl = viewer3dTokenUrl;
  }

  @action.bound
  setSelectedObjectIds(objectIds) {
    this.selectedObjectIds = objectIds;
    if (objectIds?.length) {
      this.detailsPanelOpen = true;
    } else {
      this.detailsPanelOpen = false;
    }
  }

  @action.bound
  setProjects(projectsList) {
    projectsList.sort((a, b) => a.name.localeCompare(b.name));
    this.projects = projectsList;
  }

  @action.bound
  setSpaces(spaces) {
    this.spaces = spaces.map(space => space.objectId);
  }

  @action.bound
  setViewer3dDisplayMode(mode) {
    this.viewer3dDisplayMode = mode;
  }

  @action.bound
  setDetailsPanelOpen(open) {
    this.detailsPanelOpen = open;
  }

  @action.bound
  setViewer3dState(state) {
    this.viewer3dState = state;
  }

  @action.bound
  setViewer2dState(state) {
    this.viewer2dState = state;
  }
}
