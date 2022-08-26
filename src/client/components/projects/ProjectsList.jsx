/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { Loader } from '../loader/Loader';
import { fetchProjects, projectImageUrl } from '../../api/app-api';
import { ProjectListItem } from './ProjectListItem';
import styles from './ProjectsList.module.scss';

export const ProjectsList = observer(({ store }) => {
  const { projects } = store;
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!projects) {
      fetchProjects(store);
    }
  }, []);

  useEffect(() => {
    store.setCurrentProjectId(null);
  }, []);

  const onFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };
  if (!projects) {
    return <Loader />;
  }
  const filteredProjects = projects.filter((project) => {
    if (!filter) {
      return true;
    }
    return `${project.name}${project.owner?.name}`.toLowerCase().includes(filter);
  });
  const showFilter = projects.length > 5;
  return (
    <div>
      <div className={styles.projectsHeader}>
        <Typography variant="h4">Projects</Typography>
        {showFilter && <TextField label="Filter" onChange={onFilterChange} />}
      </div>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {filteredProjects.map(project => (
              <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
                <ProjectListItem
                  to={`/project/${project.id}`}
                  name={project.name}
                  imageUrl={project.imageUrl ? projectImageUrl(project.id) : null}
                  owner={project.owner?.name}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
});
