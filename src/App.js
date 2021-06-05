import React, { useEffect } from "react";

/* import { Counter } from "./features/counter/Counter";
import { Channel } from "./features/channel/Channel"; 
import "./App.css";*/
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChannelList from "./components/ChannelList/ChannelList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { channelsList } from "./features/channel/channelSlice";
import { PlayList } from "./features/user/userSlice";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";

import "react-toastify/dist/ReactToastify.css";
import { watcherEvent, watcherValue } from "./features/watcher/watcherSlice";
import WatcherAlert from "./components/WatcherAlert/WatcherAlert";
function App() {
  const channelList = useSelector(channelsList);
  const watcher = useSelector(watcherValue);
  const playlist = useSelector(PlayList);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(watcherEvent());
    }, 1000);
  }, []);
  return (
    <div className="App">
      <header className="App-header bg-secondary">
        <NavbarComponent />
        <WatcherAlert watcherInfo={watcher} />
        <Router>
          <Switch>
            <Route exact path={"/"}>
              <ChannelList list={channelList} />
            </Route>
            <Route path="/playlist">
              <ChannelList list={playlist} isPlaylist={true} />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
