import React, { Componnet } from "reat";

class ErrorBoundary extends Componnet {

    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch =(error, info) => {
        this.setState({hasError: true, errorMessage: error})
    }

    render() {

        if (this.state.hasError) {
            return <h1> {this.state.errorMessage} </h1>
        }
    }

}

export default ErrorBoundary;