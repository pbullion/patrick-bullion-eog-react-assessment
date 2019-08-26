import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    float: "right"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 400
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    backgroundColor: "white"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      width: 300
    }
  }
};

const dataNames = [
  "tubingPressure",
  "casingPressure",
  "oilTemp",
  "flareTemp",
  "waterTemp",
  "injValveOpen"
];

function getStyles(name, dataName, theme) {
  return {
    fontWeight:
      dataName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [dataName, setDataName] = React.useState([]);

  function handleChange(event) {
    setDataName(event.target.value);
  }

  function handleChangeMultiple(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setDataName(value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          value={dataName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {dataNames.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, dataName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
