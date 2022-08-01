import styled from "styled-components";
import Discovery from "../../asset/Discovery.png";
import RFSLogoFullColour from "../../asset/RFSLogoFullColour.png";

export const ProfileSideBarList = ({ profile }) => {
  const styleContent = profile == "profile" ? "profile" : "";

  return (
    <WrappSideBarList>
      <div className={styleContent}>
        <div>
          <div className="text-center">
            <div>
              <div className="pt-5">
                <div className="style-log">
                  <img
                    style={{ width: "70px", height: "30px" }}
                    src={RFSLogoFullColour}
                    alt="RFSLogo"
                  />
                  <i class="style-hamburga fa-solid fa-bars"></i>
                </div>
              </div>
            </div>

            <div className="content-list">
              <ul>
                <li>
                  <span className="">
                    <i className="fas fa-home"></i>
                  </span>
                  Home
                </li>
                <li>
                  <span>
                    <i className="far fa-file-alt"></i>
                  </span>
                  Create
                </li>
                <li>
                  <span>
                    <i className="fas fa-file-alt"></i>
                  </span>
                  Plan
                </li>
                <li>
                  <span>
                    <i className="fas fa-sticky-note"></i>
                  </span>
                  Wallet
                </li>
                <li>
                  <span>
                    <i className="fas fa-thumbs-up"></i>
                  </span>
                  Feedback
                </li>
                <li>
                  <span>
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                  Help
                </li>
                <li>
                  <span>
                    <i className="fas fa-cog"></i>
                  </span>
                  Settings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WrappSideBarList>
  );
};

const WrappSideBarList = styled.div`
  background: #ffffff;
  .style-hamburga {
    display: none;
  }
  @media (max-width: 900px) {
    padding: 0 10px;
    .style-hamburga {
      display: block;
      font-size: 26px;
    }
    .content-list {
      display: none;
    }
    .style-log {
      
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  span {
    padding-right: 20px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-top: 6rem;
    padding-left: 2rem;
  }
  li {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 17px;
    letter-spacing: -0.04em;
    text-align: left;
    color: #242424;
    cursor: pointer;
    padding: 15px 5px;
  }
`;

export const ProfileSideBar = () => {
  return (
    <div style={{}}>
      <ProfileSideBarWrapper>
        <div className="text-center">
          <div className="pt-5">
            <img
              style={{ width: "70px", height: "30px" }}
              src={RFSLogoFullColour}
              alt="RFSLogo"
            />
          </div>
          <div style={{ paddingTop: "100px" }}>
            <img
              style={{ width: "191px", height: "255px" }}
              src={Discovery}
              alt="Discovery"
            />
          </div>
          <div style={{ paddingTop: "50px" }}>
            <h3>Almost There!</h3>
            <p>
              We only need a few info to <br /> review before unlocking your{" "}
              <br /> full access{" "}
            </p>
          </div>
        </div>
      </ProfileSideBarWrapper>
    </div>
  );
};

const ProfileSideBarWrapper = styled.div`
  background: #111e6c;
  height: 100vh;
  @media (max-width: 900px) {
    display: none;
  }
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    color: #bdbdbd;
  }
`;
