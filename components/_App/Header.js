import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {handleLogout} from '../../utils/auth'

// Router.onRouteChangeStart = () => NProgress.start()
// Router.OnRouteChangeComplete = () => NProgress.done();
// Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  

  
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user &&  user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive("/")}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            ></Image>
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header active={isActive("/cart")}>
            <Icon name="cart" size="large"></Icon>
            Cart
          </Menu.Item>
        </Link>
        {isRootOrAdmin && (
          <Link href="/create">
            <Menu.Item header active={isActive("/create")}>
              <Icon name="add square" size="large"></Icon>
              Create
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive("/account")}>
                <Icon name="user" size="large"></Icon>
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout} header>
              <Icon name="sign out" size="large"></Icon>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon name="signup" size="large" />
                login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup" size="large" />
                signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
