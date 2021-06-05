import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { EVENT_IMAGE_URI } from "../../const";

const WatcherAlert = ({ watcherInfo }) => {
  const [show, setShow] = useState(true);
  console.log("la info del watcher es:", watcherInfo.length);
  useEffect(() => {
    setShow(true);
  }, [watcherInfo[0]]);
  if (watcherInfo.length > 0) {
    return (
      <Alert
        show={show}
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
      >
        <Container>
          <Alert.Heading>{watcherInfo[0].text}</Alert.Heading>
          <h4>{watcherInfo[0].type}</h4>
          <hr />
          <p>EVENT COLOR:</p>
          <img
            src={EVENT_IMAGE_URI + watcherInfo[0].id}
            alt="Watcher Event"
            width="20rem"
            height="auto"
          />
        </Container>
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default WatcherAlert;
