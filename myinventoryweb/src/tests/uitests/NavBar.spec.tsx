import React from "react";
import renderer from "react-test-renderer";
import NavBar from "../../components/NavBar";
import NavBarProps from "../../interfaces/componentinterfaces/NavBarProps";

describe('<Nav Bar />', () => {
    class DummyNavBarProps implements NavBarProps {
        readonly navBarTitle: string = "";

        constructor(newTitle: string = "") {
            this.navBarTitle = newTitle;
        }
    }

    const navBarProps = new DummyNavBarProps("TestNavBar");

    it('title should be set to TestNavBar', () => {
        const navBarComponentTree = renderer.create(
            <NavBar navBarTitle={ navBarProps.navBarTitle } />
        ).toJSON();

        expect(navBarComponentTree).toMatchSnapshot();
    });
});