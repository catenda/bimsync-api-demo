/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { computed, observable, action, autorun, toJS } from 'mobx';
import { Viewer3dToggleSpaceModes } from '../viewer/viewer-3d-spaces-mode';

export default class Store {
  constructor() {
    autorun(() => console.log(this.report())); // eslint-disable-line no-console
  }

  report() {
    return toJS(this);
  }

  @observable viewer2dScriptLoaded = false;

  @observable viewer3dScriptLoaded = false;

  @observable user = null;

  @observable viewer3dDisplayMode = Viewer3dToggleSpaceModes.SHOW_ALL;

  @observable spaces = [];

  @observable selectedObjectIds = [];

  @computed get selectedObjectId() {
    return this.selectedObjectIds?.length === 1 ? this.selectedObjectIds[0] : null;
  }

  @observable projects = null;

  @observable currentProjectId = null;

  @observable detailsPanelOpen = false;

  @action.bound
  setCurrentProjectId(projectId) {
    if (this.currentProjectId !== projectId) {
      this.currentProjectId = projectId;
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
  setViewer2dScriptLoaded() {
    this.viewer2dScriptLoaded = true;
  }

  @action.bound
  setViewer3dScriptLoaded() {
    this.viewer3dScriptLoaded = true;
  }

  @action.bound
  setUser(user) {
    this.user = user;
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
}
