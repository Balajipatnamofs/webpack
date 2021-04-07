import React, { Component } from 'react';
import Aux from '../hoc/Aox';
const errorHandler = (WarrapperComponent, axios) => {
  //Annonmous class
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({ error: err });
      });
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    render() {
      let isShowDiv = this.state.error ? (<Aux>Error</Aux>) : <WarrapperComponent {...this.props} />;
      return (<Aux>{isShowDiv}</Aux>);
    }
  }
}
export default errorHandler;