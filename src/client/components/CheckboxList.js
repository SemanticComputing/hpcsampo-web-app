import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

let CheckboxList = (props) => {

  const { classes } = props;

  const handleToggle = value => () => {
    props.updateResultsFilter(value);
  };

  return (
    <div className={classes.root}>
      <List>
        {props.list.map(item => (
          <ListItem
            key={item.value}
            role={undefined}
            dense
            button
            onClick={handleToggle({ property: props.property, value: item.value })}
            className={classes.listItem}
          >
            <Checkbox
              checked={item.selected}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={item.value} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array,
  updateResultsFilter: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired
};

export default withStyles(styles)(CheckboxList);
