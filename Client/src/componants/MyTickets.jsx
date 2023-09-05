import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyTickets = () => {
  const [team, setTeam] = useState("");
  const [results, setResults] = useState([]);
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchingTeam = async () => {
      await fetch(`http://localhost:3200/${team}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setResults(data.results);
          } else {
            alert("failed");
          }
        });
    };
    fetchingTeam();
  }, [team, id]);
    
  console.log(results);

  const mapping = results.map((ticket, id) => {
    return (
      <>
        <tr key={id}>
          <th scope="row">
            <Link to={`/view/${ticket.ticket_id}`}>{ticket.ticket_id}</Link>
          </th>
          <td>{ticket.ticket[0]?.socket_id}</td>
          <td>{ticket.ticket[0]?.sent_message}</td>
          <td>{ticket.ticket[0]?.created}</td>
        </tr>
      </>
    );
  });

  return (
    <div>
      <div style={{ height: "80vh" }}>
        <div className="container mt-5">
          <h1 className="text-center text-primary">Tickets</h1>
          <div className="row ">
            <div className="col-md-8 col-lg-8 mx-auto">
              <div>
                <div className="row my-4">
                  <div className="col">
                    <div class="input-group mb-3">
                      <select
                        class="form-select"
                        onChange={(e) => setTeam(e.target.value)}
                      >
                        <option selected>Choose...</option>
                        <option value="technical_tickets">Technical</option>
                        <option value="support_tickets">Support</option>
                        <option value="billing_tickets">Billing</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md col-lg">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Ticket ID</th>
                    <th scope="col">Socket ID</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created</th>
                  </tr>
                </thead>
                <tbody>{mapping}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
