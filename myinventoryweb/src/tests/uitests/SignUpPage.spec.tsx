import React from "react";
import renderer from "react-test-renderer";
import SignUpPage from "../../components/SignUpPage";

describe('<SignUpPage />', () => {
    it('on intial render all fields should be empty', () => {
        const signUpPageTree = renderer.create(
            <SignUpPage />
        ).toJSON();
    });
});