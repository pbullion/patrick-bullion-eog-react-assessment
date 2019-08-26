import React, {useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

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

const dataList = [
  "tubingPressure",
  "casingPressure",
  "oilTemp",
  "flareTemp",
  "waterTemp",
  "injValveOpen"
];

function getStyles(name, dataNames, theme) {
  return {
    fontWeight:
      dataNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [dataNames, setDataName] = React.useState([]);

  function handleChange(event) {
    setDataName(event.target.value);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actions.DATA_NAME_ADDED, dataNames })
  }, [dataNames]);

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select
          multiple
          value={dataNames}
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
          {dataList.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, dataNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
