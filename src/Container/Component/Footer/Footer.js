import "./Footer.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Footer extends Component {
  state = {
    footerDetails: {
      Footer: {
        FooterCopyrightText:
          'Copyright © <a href="https://lokostop.in">Lokostop</a> 2021. All rights reserved.',
        AcceptedPaymentMethodsImage: "",
      },
    },
  };
  componentDidMount() {
    this.setState({
      footerDetails: this.props.footerData.Footer
        ? this.props.footerData
        : this.state.footerDetails,
    });
  }
  render() {
    return (
      <footer className="footer">
        <div className="area_1">
          {/* <div className="logo1">SIDHU electronics</div>
                <p className="area_1_para">We promise products from best brands with assurance.</p> */}
          <a
            href="https://www.google.com/maps/place/Shop+No.+4669,+1,+Shingar+Cinema+Rd,+Baba+Than+Singh+Chowk,+Opposite+Kalra+Hospital,+Fatehganj,+Ludhiana,+Punjab+141008/@30.9141817,75.8644781,17z/data=!3m1!4b1!4m5!3m4!1s0x391a8312c81bf2c7:0x3d7ec9369a0e025b!8m2!3d30.9141817!4d75.8666668"
            target="#"
          >
            <img
              src="https://www.google.com/maps/vt/data=2StCVG_pvqmZ1rje37RZrKw4YWfMf4yq_wsA1c_J4dZTYphMkKI7wXDrIg1fH7e84tBBvSWc96etbq6X3KeHfc4bR42oZ5dSNREcu-7Cuf4PngXjgopEus1LRM7H3BYjUF3ksoC9f_9vMiZSFQvHJqL4S-hTJYtRvuqYLv8"
              alt="RELOAD"
            />
          </a>
          {/* <p className="second_para_area_1">Shop No. 4669/1 Shingar Cinema Rd, Near Shingar Cinema, New Shivaji Nagar, Samrala Chowk, Ludhiana, Punjab 141008</p></a> */}
        </div>
        <div className="area_2">
          <div className="outer_area_boxes">
            <div className="box_one_area_2">
              <p>INFORMATION</p>
              <ul>
                {/* <li>Delivery</li> */}
                <li><Link to="/about">About Us</Link></li>
                <li>Secure Payment</li>
                <li>Send Query</li>
                {/* <li>Sitemap</li>
                            <li>Stores</li> */}
              </ul>
            </div>
            <div className="box_one_area_2">
              <p>CUSTOM LINKS</p>
              <ul>
                <li>New Arrivals</li>
                <li>Popular Categories</li>
                <li>Featured Products</li>
                <li>Best Selling</li>
                {/* <li>Query</li> */}
              </ul>
            </div>
            <div className="box_one_area_2">
              <p>HELP DESK</p>
              <ul>
                <li>
                  {this.props.store && this.props.store.TermsConditionsPage ? (
                    <Link
                      to={"/page/" + this.props.store.TermsConditionsPage.url}
                    >
                      Terms of Use
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li>
                  {this.props.store && this.props.store.PrivacyPolicyPage ? (
                    <Link
                      to={"/page/" + this.props.store.PrivacyPolicyPage.url}
                    >
                      Priavcy Policy
                    </Link>
                  ) : (
                    ""
                  )}
                </li>
                <li>Payments and Returns</li>
                <li>Shipping option</li>
                <li>Help/FAQ</li>
              </ul>
            </div>
          </div>
          <div className="second_box_profile">
            <p>PROFILE</p>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li>My orders</li>
              <li><Link to={{ pathname: "/profile", wishlistActive: true }}>My Favorites</Link></li>
            </ul>
          </div>
          <p
            className="copyright"
            dangerouslySetInnerHTML={{
              __html: this.state.footerDetails.Footer.FooterCopyrightText,
            }}
          ></p>
        </div>
        <div className="area_3">
        {this.state.footerDetails.Footer.AcceptedPaymentMethodsImage.image && 

          <div className="paymentmethod">
            <p>PAYMENT METHODS</p>
            <div className="logo2">
                    <img src={"https://api.lokostop.in/"+this.state.footerDetails.Footer.AcceptedPaymentMethodsImage.image} />
            </div>
          </div>
  }
          <div className="followUs">
            <p>FOLLOW US ON</p>

            <div className="social">
              <ul>
                {this.props.footerData && this.props.footerData.SocialLinks && (
                  <React.Fragment>
                    <a
                      href={this.props.footerData.SocialLinks.Facebook}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-facebook fa-2x"
                          style={{ color: "#4267B2" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Twitter}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-twitter fa-2x"
                          style={{ color: "#00acee" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Instagram}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-instagram-square fa-2x"
                          style={{ color: "#cd486b" }}
                        />
                      </li>
                    </a>
                    <a
                      href={this.props.footerData.SocialLinks.Youtube}
                      target="#"
                    >
                      <li>
                        <i
                          className="fab fa-youtube fa-2x"
                          style={{ color: "#ff0000" }}
                        />
                      </li>
                    </a>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    footerData: state.getFooter.footerData,
    footerLoading: state.getFooter.loading,
    store: state.getStore.store,
  };
};
export default connect(mapStateToProps)(Footer);
