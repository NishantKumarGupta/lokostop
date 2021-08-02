import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header/Header";
import "./IndividualProduct.css";
import FindByCategory from "../Component/Boxes/FindByCategory";
import Product from "../Component/Product";
import IndividualProductDetails from "./IndividualProductDetails";
import Header01 from "../Component/Header/Header01";
import React, { Component } from "react";
import PopularBox from "../Component/Boxes/PopularBox";
import ShowReview from "./ShowReview";
import { IoIosArrowBack, IoIosArrowForward, IoIosAttach } from "react-icons/io";
import { connect } from "react-redux";
import { getProductDetails } from "../../Redux/Actions/ProductActions";
import Loader from "../Loader/Loader";
import api from "../../Apis/api";

class IndividualProduct extends Component {
  state = {
    productDetails: {
      name: "--",
      price: "--",
      additionalImages: [],
      baseImage: {
        image: "",
      },
      categories: [
        {
          name: "--",
          _d: "--",
        },
      ],
      attributes: [],
      options: [],
    },
    review: {
      rating: 0,
      reviewerName:
        this.props.user["First Name"] + " " + this.props.user["Last Name"],
      comment: "",
      status: false,
    },
    productReviews: [],
  };
  componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
    this.setState({
      productDetails: this.props.productDetails
        ? this.props.productDetails
        : this.state.productDetails,
    });
    let url = "/review/get/product/" + this.props.match.params.id;
    api
      .get(url)
      .then((res) => {
        this.setState({ productReviews: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (this.props.productLoading) {
      return <Loader />;
    }
    return (
      <div>
        <Header01></Header01>
        <Header />
        <IndividualProductDetails
          productDetails={this.state.productDetails}
          reviews={this.state.productReviews}
        />
        <div className="review_main_with_specification">
          <ul className="nav nav-tabs " id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2vw Poppins",
                }}
                className="nav-link active individual_product_nav_item"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2vw Poppins",
                }}
                className="nav-link individual_product_nav_item"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Specifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                style={{
                  color: " #9d9d9d",
                  font: " normal normal normal 1vw/2.3vw Poppins",
                }}
                className="nav-link individual_product_nav_item"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Reviews
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div
                className="desciptionbox"
                dangerouslySetInnerHTML={{
                  __html: this.state.productDetails.description,
                }}
              ></div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="specification_outer_box">
                {this.state.productDetails.attributes.map((attribute, key) => {
                  return (
                    <div className="particularSpecification" key={key}>
                      <h6>{attribute.attribute.name}</h6>
                      <p>{attribute.value.join(", ")} </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="review_outer_box">
                <p className="read_review" style={{ marginTop: "1.171vw" }}>
                  Read reviews here
                </p>
                <div className="review_star">
                  <i
                    className={
                      this.state.review.rating > 0
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={(e) => {
                      const { review } = this.state;
                      review.rating = 1;
                      this.setState({ review });
                    }}
                  ></i>
                  <i
                    className={
                      this.state.review.rating > 1
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={(e) => {
                      const { review } = this.state;
                      review.rating = 2;
                      this.setState({ review });
                    }}
                  ></i>
                  <i
                    className={
                      this.state.review.rating > 2
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={(e) => {
                      const { review } = this.state;
                      review.rating = 3;
                      this.setState({ review });
                    }}
                  ></i>
                  <i
                    className={
                      this.state.review.rating > 3
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={(e) => {
                      const { review } = this.state;
                      review.rating = 4;
                      this.setState({ review });
                    }}
                  ></i>
                  <i
                    className={
                      this.state.review.rating > 4
                        ? "fas fa-star"
                        : "far fa-star"
                    }
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={(e) => {
                      const { review } = this.state;
                      review.rating = 5;
                      this.setState({ review });
                    }}
                  ></i>
                </div>
                <div className="write_review">
                  <div className="customer_review">
                    <textarea
                      className="commentBox"
                      maxLength="200"
                      placeholder="Choose a rating and start writing a review..."
                    ></textarea>
                    <div className="count_attach">
                      <IoIosAttach className="attach" />
                      <p className="no_count">0/200</p>
                    </div>
                  </div>
                  <button className="review_button">Post Review</button>
                </div>
                {this.state.productReviews.length > 0 ? (
                  this.state.productReviews.map((review, key) => {
                    return <ShowReview key={key} review={review} />;
                  })
                ) : (
                  <div className="text-center">
                    Be the first one to review this product!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="most_view_box">
          <p className="most_viewd_text">PEOPLE ALSO BUY</p>
          <hr id="line_view"></hr>
          <div id="arrow_box">
            <IoIosArrowBack id="Arrow_forward" />
            <IoIosArrowForward id="Arrow_backward" />
          </div>
        </div>

        <div className="new_arrival_box">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        <FindByCategory />
        <PopularBox />
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productDetails: state.getProductDetails.product,
    productLoading: state.getProductDetails.loading,
    user: state.getUser.user,
  };
};
export default connect(mapStateToProps, { getProductDetails })(
  IndividualProduct
);
