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

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});
const query = `
query heartBeat {
  heartBeat
}
`;

const getDataNames = state => {
  const { names } = state.dataNames;
  return {
    names
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Dashboard />
    </Provider>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const { names } = useSelector(getDataNames);
  const dispatch = useDispatch();
  const [heartBeat, setHeartbeat] = React.useState();
  const [result] = useQuery({
    query
  });

  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    setHeartbeat(data.heartBeat);
    console.log(data.heartBeat);
    dispatch({ type: actions.HEARTBEAT_UPDATED, heartBeat })

  }, [dispatch, data, error]);

  useEffect(() => {
    console.log(heartBeat)
    dispatch({ type: actions.HEARTBEAT_UPDATED, heartBeat })
  }, [heartBeat]);

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
