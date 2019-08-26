import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import { createClient, Provider, useQuery } from "urql";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import CardContent from "@material-ui/core/CardContent";
import * as actions from "../store/actions";
import DataCard from "./DataCard";

const useStyles = makeStyles({
  cardRow: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const getDataNames = state => {
  const { names } = state.dataNames;
  return {
    names
  };
};

export default () => {
  return (
    <Provider>
      <Dashboard />
    </Provider>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const { names } = useSelector(getDataNames);
  console.log(names);

  return (
    <Fragment>
      <SearchBar />
      <div className={classes.cardRow}>
        {names
          ? names.map((item, index) => <DataCard name={item.name} key={index}/>)
          : null}
      </div>
    </Fragment>
  );
};
