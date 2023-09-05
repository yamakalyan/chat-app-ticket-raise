import { useState } from "react";

const CreateTicket = ({ socket }) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState("");

  const handleCreation = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3200/create_support", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team: team,
        user_id: "1234",
        sent_message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
            socket.emit("create_ticket", team);
            setAlert(true)
            setMessage("")
            setTeam("")
            localStorage.setItem("user_id", "1234")
        } else {
          alert("failed");
        }
      });
  };

  return (
    <div style={{ height: "80vh", display: "grid", placeItems: "center" }}>
      <div className="container">
        <h1 className="text-center text-primary">Create ticket</h1>
        <div className="row ">
          <div className="col-md-8 col-lg-8 mx-auto">
            <div>
              <form onSubmit={handleCreation}>
                <div className="row my-4">
                  <div className="col">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Write your message here"
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <div class="input-group mb-3">
                      <select
                        class="form-select"
                        onChange={(e) => setTeam(e.target.value)}
                      >
                        <option selected>Choose...</option>
                        <option value="technical">Technical</option>
                        <option value="support">Support</option>
                        <option value="billing">Billing</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className={
                      alert ? "btn btn-success disabled" : "btn btn-primary"
                    }
                    type="submit"
                  >
                    {alert ? "Successful" : "Create ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
