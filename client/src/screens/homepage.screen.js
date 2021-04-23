import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Row, Col, Container, Card, Image } from "react-bootstrap";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }
    componentDidMount() {
    axios
      .get("http://localhost:4000/users/show-videos")
      .then((res) => {
        this.setState({
          videos: res.data,
        });
        console.log(this.state.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
        <Container fluid>
         <Row>
                {this.state.videos.map((i) => {
            
               return (
                    <Card key={i} style={{ width: "18rem" , margin: "20px" }}>
                    <Link
                      to={{
                        pathname: "/watch/" + i._id,
                        link: i.link,
                      }}
                    >
                      <Card.Img
                        variant="top"
                        width={171}
                        height={180}
                        src={i.thumbnail}
                        alt="logo"
                      />
                      <Card.Body>
                        <Card.Title>{i.title}</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                )
            })}
        </Row>
        
      </Container>
    );
  }
}
