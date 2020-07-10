/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Radio, FormControlLabel, RadioGroup, FormControl } from '@material-ui/core';
import { Viewer3dToggleSpaceModes } from './viewer-3d';

export const Toolbar = ({ store, className }) => {
  const [value, setValue] = useState(store.viewer3dDisplayMode);

  const onChange = (event) => {
    setValue(event.target.value);
    store.setViewer3dDisplayMode(event.target.value);
  };

  return (
    <FormControl className={className} component="fieldset">
      <RadioGroup aria-label="position" name="position" value={value} onChange={onChange} row>
        {Object.values(Viewer3dToggleSpaceModes).map(mode => (
          <FormControlLabel
            key={mode}
            value={mode}
            control={<Radio color="primary" />}
            label={mode}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
