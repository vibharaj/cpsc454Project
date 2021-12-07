import React, { Component } from "react";

import Navbar from "../../Navbar/Navigation";
import NavbarAdmin from "../../Navbar/NavigationAdmin";

import getWeb3 from "../../../getWeb3";
import Election from "../../../contracts/Election.json";

import AdminOnly from "../../AdminOnly";

import "./AddCandidate.css";

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      header: "",
      slogan: "",
      candidates: [],
      candidateCount: undefined,
    };
  }

  componentDidMount = async () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );
      
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      const candidateCount = await this.state.ElectionInstance.methods
        .getTotalCandidate()
        .call();
      this.setState({ candidateCount: candidateCount });

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      for (let i = 0; i < this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i)
          .call();
        this.state.candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
        });
      }

      this.setState({ candidates: this.state.candidates });
    } catch (error) {
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };
  updateHeader = (event) => {
    this.setState({ header: event.target.value });
  };
  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value });
  };

  addCandidate = async () => {
    await this.state.ElectionInstance.methods
      .addCandidate(this.state.header, this.state.slogan)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    if (!this.state.isAdmin) {
      return (
        <>
          <Navbar />
          <AdminOnly page="Add Candidate Page." />
        </>
      );
    }
    return (
      <>
        <NavbarAdmin />
        <div className="container-main">
          <h2>Add a new candidate</h2>
          <small>Total candidates: {this.state.candidateCount}</small>

            <form className="form">
              <label className={"label-ac"}>
                Header
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="eg. Marcus"
                  value={this.state.header}
                  onChange={this.updateHeader}
                />
              </label>
              <label className={"label-ac"}>
                Slogan
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="eg. It is what it is"
                  value={this.state.slogan}
                  onChange={this.updateSlogan}
                />
              </label>
              <button
                className="btn-add"
                disabled={
                  this.state.header.length < 3 || this.state.header.length > 21
                }
                onClick={this.addCandidate}
              >
                Add
              </button>
            </form>
 
        </div>
        {loadAdded(this.state.candidates)}
      </>
    );
  }
}
export function loadAdded(candidates) {
  const renderAdded = (candidate) => {
    return (
      <>
        <div className="container-list success">
          <div
            style={{
              maxHeight: "21px",
              overflow: "auto",
            }}
          >
            {candidate.id}. <strong>{candidate.header}</strong>:{" "}
            {candidate.slogan}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="container-main">
      <div className="container-item info">
        <center>List of Candidates</center>
      </div>
      {candidates.length < 1 ? (
        <div className="container-item alert">
          <center>No candidates added.</center>
        </div>
      ) : (
        <div
          className="container-item"
          style={{
            display: "block",
            backgroundColor: "#DDFFFF",
          }}
        >
          {candidates.map(renderAdded)}
        </div>
      )}
    </div>
  );
}
