import { useStore } from "@/client/context";
import { authConstants } from "@/client/context/constants";
import { getValue } from "@/utils/common";
import { signOut } from "next-auth/react";
NavDropdown;
import Link from "next/link";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = (props) => {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);
  return (
    <div className="container">
      <header className="blog-header lh-1 py-3">
        <div
          className="row  justify-content-between align-items-center"
          style={{ flexWrap: "wrap !important" }}
        >
          <div className="col-4 pt-1">
            {authenticated ? (
              <Link href={`/profile`} legacyBehavior>
                <a className="link-secondary" href="#">
                  {user.name}
                </a>
              </Link>
            ) : (
              <Link href={`/`} legacyBehavior>
                <a className="link-secondary" href="#">
                  Welcome guest
                </a>
              </Link>
            )}
          </div>
          <div className="col-4 text-center">
            <Link href={`/`} legacyBehavior>
              <a className="blog-header-logo text-dark" href="#">
                NEWSX
              </a>
            </Link>
          </div>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="col-4 d-flex justify-content-end align-items-center">
                <a className="link-secondary" href="#" aria-label="Search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mx-3"
                    role="img"
                    viewBox="0 0 24 24"
                  >
                    <title>Search</title>
                    <circle cx="10.5" cy="10.5" r="7.5" />
                    <path d="M21 21l-5.2-5.2" />
                  </svg>
                </a>
                {authenticated ? (
                  <>
                    <Link href="/post/create" legacyBehavior>
                      <a className="btn btn-sm btn-outline-secondary user-login-btn">
                        Create
                      </a>
                    </Link>

                    <a
                      className="btn btn-sm btn-outline-secondary"
                      href="#"
                      onClick={() => {
                        signOut({
                          redirect: false,
                        }).then((result) =>
                          dispatch({ type: authConstants.LOGIN_FAILURE })
                        );
                      }}
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <Link href="/signup" legacyBehavior>
                      <a
                        className="btn btn-sm btn-outline-secondary user-login-btn"
                        href="#"
                      >
                        Sign up
                      </a>
                    </Link>
                    <Link href="/login" legacyBehavior>
                      <a
                        className="btn btn-sm btn-outline-secondary user-login-btn"
                        href="#"
                      >
                        Sign in
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </header>

      <style jsx>{`
        .bd-placeholder-img {
          font-size: 1.125rem;
          text-anchor: middle;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        @media (min-width: 768px) {
          .bd-placeholder-img-lg {
            font-size: 3.5rem;
          }
        }

        .b-example-divider {
          height: 3rem;
          background-color: rgba(0, 0, 0, 0.1);
          border: solid rgba(0, 0, 0, 0.15);
          border-width: 1px 0;
          box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
            inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
        }

        .b-example-vr {
          flex-shrink: 0;
          width: 1.5rem;
          height: 100vh;
        }

        .bi {
          vertical-align: -0.125em;
          fill: currentColor;
        }

        .nav-scroller {
          position: relative;
          z-index: 2;
          height: 2.75rem;
          overflow-y: hidden;
        }

        .nav-scroller .nav {
          display: flex;
          flex-wrap: nowrap;
          padding-bottom: 1rem;
          margin-top: -1px;
          overflow-x: auto;
          text-align: center;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }

        .user-login-btn {
          margin: 0 5px;
        }
      `}</style>
    </div>
  );
};

export default Header;
