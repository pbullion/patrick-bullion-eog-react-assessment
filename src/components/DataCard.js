import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { createClient, Provider, useQuery } from "urql";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});
const query = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}
`;

const useStyles = makeStyles({
  card: {
    textAlign: "center",
    width: 200,
    height: 150,
    margin: "2%"
  }
});

export default props => {
  return (
    <Provider value={client}>
      <DataCard {...props} />
    </Provider>
  );
};

const DataCard = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [metricValues, setMetricValues] = React.useState([]);
  const [result, executeQuery] = useQuery({
    query,
    variables: {
      metricName: props.metricName
    }
  });

  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    setMetricValues(data.getLastKnownMeasurement);
    const interval = setInterval(() => {
      executeQuery({ requestPolicy: "network-only" });
      setMetricValues(data.getLastKnownMeasurement);
    }, 1300);
    return () => clearInterval(interval);
  }, [dispatch, data, error, executeQuery]);

  return (
    <Card className={classes.card}>
      <CardHeader title={props.metricName} />
      <CardContent>
        <h2>{metricValues.value}</h2>
      </CardContent>
    </Card>
  );
};
