import React, {Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";

const useStyles = makeStyles({
});

export default () => {
  const classes = useStyles();
  return (
      <Fragment>
        <SearchBar />
      </Fragment>
  );
};
