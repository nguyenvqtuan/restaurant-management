import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const Other = ({ children }: Props) => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              </li>
              <li className="nav-item">

              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Other