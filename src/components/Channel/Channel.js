import React, { useRef, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  channelListRemove,
  channelListAdd,
} from "../../features/channel/channelSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addPlaylist, removePlaylist } from "../../features/user/userSlice";

const Channel = ({ channel, isPlaylist }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const channelValue = useRef(channel);
  const dispatch = useDispatch();
  //const playlist = useSelector(PlayList);
  //const playlistValue = useRef([...playlist]);

  const exist_in_playlist = () => {
    return (
      <Button className="m-1" variant="success" onClick={addHandler}>
        Agrgar Playlist
      </Button>
    );
  };
  const removeHandler = () => {
    toast.error(`${channelValue.current.name} , fue eliminado de la playlist`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(removePlaylist(channelValue.current));
    dispatch(channelListAdd(channelValue.current));
  };
  const addHandler = () => {
    toast.success(`${channelValue.current.name} , fue agregado a la playlist`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(addPlaylist(channelValue.current));
    dispatch(channelListRemove(channelValue.current));
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Card.Title className="text-center">
          {channelValue.current.name}
        </Card.Title>

        <hr className="p-1" />

        <video
          style={{ width: "100%", height: "auto" }}
          src={
            "http://develop.danaide.com.ar/test/api/video/" +
            channelValue.current.id +
            ".mp4"
          }
          muted
        ></video>
        <Card.Footer className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            Ver
          </Button>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title> {channelValue.current.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
              <video width="100%" controls>
                <source
                  src={
                    "http://develop.danaide.com.ar/test/api/video/" +
                    channelValue.current.id +
                    ".mp4"
                  }
                  type="video/mp4"
                />
                <source src="mov_bbb.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

          {isPlaylist ? (
            <Button className="m-1" variant="danger" onClick={removeHandler}>
              Borrar
            </Button>
          ) : (
            exist_in_playlist()
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Channel;
