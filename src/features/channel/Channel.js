import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { channelsList, getChannels } from "./channelSlice";

import styles from "./Counter.module.css";

export const Channel = memo(() => {
  console.log("Channel rendered");
  const channelList = useSelector(channelsList);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        {/* channelList && channelList.length !== 0
          ? channels.map((c, i) => console.log(`Canal Numero${i} y tiene `, c))
          : console.log("no hay canales cargados!") */}
        <h3>LISTA DE GANALES</h3>
        {console.log(channelList)}
        <button
          onClick={() => {
            dispatch(getChannels());
          }}
        >
          CARGAR LISTA
        </button>
      </div>
    </div>
  );
});
