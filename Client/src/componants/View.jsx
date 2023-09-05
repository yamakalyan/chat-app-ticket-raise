import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const View = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [sendMessage, setSendMessage] = useState([]);
  const id = localStorage.getItem("user_id")

  const params = useParams()

  const handleMessage = async (e) => {
    e.preventDefault();
    setSendMessage((msg) => [...msg, message]);

    const options = {
      user_id: id,
      send_message: message,
      date: new Date(),
    };

    await fetch(`http://localhost:3200/ticket/${params.name}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "1234",
        sent_message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          socket.emit("send_message", options);
          setSendMessage((msg) => [...msg, options]);
        } else {
          alert("failed");
        }
      });
  };

  useEffect(() => {
    socket.emit("join_chat", params.name);
    socket.on("receive_message", (data) => {
      setReceivedMessage((msg) => [...msg, data]);
    });
  }, [socket]);

  return (
    <div>
      <div
      // style={{
      //   height: "100vh",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <div className="container mt-5">
          <h1 className="text-center text-primary">Live Chat</h1>
          <div className="row">
            <div className="col-md-4 col-lg-4 mx-auto border border-3">
              <div
                style={{
                  height: "50vh",
                  padding: "10px",
                  overflow: "scroll",
                  overflowX: "hidden",
                }}
              >
                {receivedMessage?.map((msg, id) => {
                  return (
                    <>
                      <h2
                        className="bg-dark text-light px-3"
                        style={{
                          display: "flex",
                          justifyContent: "start",
                        }}
                        key={id}
                      >
                        {msg.send_message}
                      </h2>
                    </>
                  );
                })}
                {sendMessage?.map((msg, id) => {
                  return (
                    <>
                      <h2
                        className="bg-primary text-light px-3"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                        key={id}
                      >
                        {msg.send_message}
                      </h2>
                    </>
                  );
                })}
              </div>
              <form onSubmit={handleMessage}>
                <div className="row my-4">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter message"
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary" type="submit">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View
