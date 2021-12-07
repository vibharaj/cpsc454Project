import React from "react";
import { Link } from "react-router-dom";

const StartEnd = (props) => {
  const btn = {
    background:"#1E90FF",
    color: "white",
    fontWeight: "bold",
    display: "block",
    padding: "21px",
    margin: "7px",
    minWidth: "max-content",
    textAlign: "center",
    width: "333px",
    alignSelf: "center",
  };
  return (
    <div
      className="container-main"
      //style={{ borderTop: "1px solid", marginTop: "0px" }}
    >
      {!props.elStarted ? (
        <>
          {}
          {!props.elEnded ? (
            <>
              <div className="container-item">
                <button type="submit" style={btn}>
                  Start Election {props.elEnded ? "Again" : null}
                </button>
              </div>
            </>
          ) : (
            <div className="container-item">
              <center>
                <p>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {props.elEnded ? (
            <div className="container-item">
              <center>
                <p>The election ended.</p>
              </center>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="container-item">
            <center>
              <p>The election started.</p>
            </center>
          </div>
          <div className="container-item">
            <button
              type="button"
              onClick={props.endElFn}
              style={btn}
            >
              End
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StartEnd;
