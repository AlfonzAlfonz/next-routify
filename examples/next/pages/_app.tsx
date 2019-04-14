import NextApp, { Container } from "next/app";
import * as React from "react";
import Navbar from "components/Navbar";

class App extends NextApp {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <Container>
                <Component {...pageProps} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
