/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import BusinessTwoToneIcon from '@material-ui/icons/BusinessTwoTone';

import styles from './ProjectListItem.module.scss';

export const ProjectListItem = React.memo(({ imageUrl, name, to, owner }) => {
  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => ( // eslint-disable-line react/no-multi-comp
      <Link ref={ref} to={to} {...linkProps} />
    )),
    [to]
  );

  return (
    <Card className={styles.card}>
      <CardActionArea component={CustomLink}>
        <CardMedia
          className={styles.media}
          image={imageUrl}
          title={name}
        >
          {!imageUrl && <BusinessTwoToneIcon className={styles.placeholder} />}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Owner: ${owner}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
