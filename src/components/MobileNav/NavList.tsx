import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { homeUrl } from "../../app/routes";
import NavItem, { INavItem } from "./NavItem";

import { history } from "../../history";

import backImg from "../../images/arrow-back.svg";
import logoImg from "../../images/erocery_logo.svg";

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
}

interface NavListState {
  parent: INavItem | null;
  displayedItems: INavItem[];
}

const scrollToCategory = () => {
  history.push("/");
  setTimeout(() => {
    document.getElementById("categorysection").scrollIntoView();
  }, 200);
};

class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    parent: null,
  };

  handleShowSubItems = (item: INavItem) => {
    this.setState({ parent: item, displayedItems: item.children });
  };

  handleGoBack = () => {
    const grandparent = this.state.parent.parent;

    if (!grandparent) {
      this.setState({ parent: null, displayedItems: this.props.items });
    } else {
      const newParent = this.findItemById(grandparent.id);
      this.setState({
        displayedItems: newParent.children,
        parent: newParent,
      });
    }
  };

  findItemById(id: string): INavItem {
    let match = null;
    function find(item) {
      if (item.id === id) {
        match = item;
        return true;
      }
      return item.children && item.children.some(find);
    }
    this.props.items.some(find);
    return match;
  }

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems, parent } = this.state;

    return (
      <div>
      <ul>
        {parent ? (
          <li className="side-nav__menu-item side-nav__menu-item-back">
            <span onClick={this.handleGoBack}>
              <ReactSVG path={backImg} /> {parent.name}
            </span>
          </li>
        ) : (
          <>
            <li className="side-nav__menu-item side-nav__menu-item--parent">
              <Link
                to={homeUrl}
                className="side-nav__menu-item-logo"
                onClick={hideOverlay}
              >
                 {/* <img src={logoImg}/> */}
                <ReactSVG path={logoImg} className="logoImg" />
              </Link>
              <span className="side-nav__menu-item-close" onClick={hideOverlay}>
                <span className="line1" />
                <span className="line2" />
              </span>
            </li>
            {/* <li className="side-nav__menu-item">
            </li>
            <li className="side-nav__menu-item">
              <Link
                to={homeUrl}
                className="side-nav__menu-item-link"
                onClick={hideOverlay}
              >
                Home
              </Link>
            </li> */}
          </>
        )}
        </ul>
        <ul className="menu-list">
            <li
              className="side-nav__menu-item"
              onClick={() => scrollToCategory()}
            >
              <span onClick={hideOverlay} className="side-nav__menu-item-link">
                All Categories
              </span>
            </li>
            <li className="side-nav__menu-item">
              <Link
                to={homeUrl}
                className="side-nav__menu-item-link"
                onClick={hideOverlay}
              >
                Home
              </Link>
            </li>
        {displayedItems.map(item => (
          <NavItem
            key={item.id}
            hideOverlay={hideOverlay}
            showSubItems={this.handleShowSubItems}
            {...item}
          />
        ))}
      </ul>
      </div>
    );
  }
}

export default NavList;
