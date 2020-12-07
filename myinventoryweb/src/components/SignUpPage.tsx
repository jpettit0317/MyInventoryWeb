import React from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SignUpRouterProps {}
interface SignUpPageProps extends RouteComponentProps<SignUpRouterProps> {}

const SignUpPage: React.FC<SignUpPageProps> = props => {
    return (
        <h1> Sign up page!! </h1>
    );
}

export default withRouter(SignUpPage);