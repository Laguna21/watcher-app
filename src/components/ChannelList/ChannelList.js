import React, { useEffect /*  useEffect, useState */ } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getChannels } from "../../features/channel/channelSlice";
import { getPlaylist } from "../../features/user/userSlice";

import Channel from "../Channel/Channel";

const ChannelList = ({ list, isPlaylist }) => {
  console.log("Channel List Render");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPlaylist) {
      dispatch(getPlaylist());
    } else {
      dispatch(getChannels());
    }
  }, []);

  return (
    <div>
      {isPlaylist ? (
        <Container>
          <div className="jumbotron bg-success">
            <h3 className="text-white">Playlist</h3>
            <hr />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="jumbotron bg-primary">
            <h2 className="text-white">Canales</h2>
            <hr />
          </div>
        </Container>
      )}
      <Container>
        <Row className="justify-content-md-center">
          {list && list.length !== 0
            ? list.map((channel) => {
                return (
                  <Col className="mt-4" key={channel.id}>
                    <Channel channel={channel} isPlaylist={isPlaylist} />
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
};

export default ChannelList;
