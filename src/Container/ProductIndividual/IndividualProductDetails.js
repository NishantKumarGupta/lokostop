import { BiCart } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/Actions/CartActions";
import { siteUrl } from "../../Utils/util";
import api from '../../Apis/api'
class IndividualProductDetails extends Component {
  state = {
    productId: this.props.productDetails._id,
    qty: 1,
    footerDetails: {
      Footer: {
        AcceptedPaymentMethodsImage: "",
      },
    },
    stock: [],
    selectedStockArray:[],
    stockId: null
  };
  componentDidMount() {
    api.post('/product/stock/byproduct/get', {productId: this.props.productDetails._id}).then(res=>{
      const {stock } = this.state
      res.data.data.forEach(stk=>{
        stock[stk.name] = [stk.qty,stk.price,stk._id] 
      })
      console.log(stock)
      this.setState({stock})
    }).catch(err=>{
      console.log(err)
    })
    this.setState({
      footerDetails: this.props.footerData.Footer
        ? this.props.footerData
        : this.state.footerDetails,
    });
  }
  getOption = (type, label, required, values, unique) => {
    if (type == "Field") {
      return (
        <div className="save_box individual_save_box" key={unique} >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <input className="product-qty individual_product-qty  product-input" type="text" />
        </div>
      );
    } else if (type == "Textarea") {
      return (
        <div
          className="save_box individual_save_box individual_save_column "
          key={unique}
        >
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <textarea
            className="product-qty individual_product-qty  product-input"
            type="text"
            row="3"
          ></textarea>
        </div>
      );
    } else if (type == "Dropdown") {
      return (
        <div className="save_box individual_save_box" key={unique}>
          <p className="save_text individual_save_text">
            {" "}
            {label}{required && "*"}
          </p>
          <select className="dropdown_colors individual_dropdown_colors product-input" onChange={(e)=>{
            const {selectedStockArray} = this.state
            selectedStockArray[unique] = e.target.value
            console.log(selectedStockArray)
            this.setState({selectedStockArray})
          }}>
            <option value="">Please select</option>
            {values.map((value, key) => {
              return (
                <option value={value.label} key={key}>
                  {value.label}
                </option>
              );
            })}
          </select>
        </div>
      );
    } else if (type == "Checkbox") {
      return <div className="save_box individual_save_box" key={unique}>
          <p className="save_text individual_save_text">
            {" "}
            {label}: {required && "*"}
          </p>
          <div className="d-flex checkbox-flex" style={{height: '100%', marginLeft: '0.9vw'}}>
            {values.map((value, key) => {
              return (
                <div className="d-flex p-1 justify-content-center align-items-center" key={key}>
                <input type="checkbox" onChange={(e)=>{
                  const {selectedStockArray} = this.state
                  if(selectedStockArray[unique] == undefined ){
                    selectedStockArray[unique] = []
                  }
                  if(selectedStockArray[unique][key] == value.label){
                    selectedStockArray[unique].splice(key,1)
                  }else
                    selectedStockArray[unique][key] = value.label
                  console.log(selectedStockArray)
                  this.setState({selectedStockArray})
                }}>
                </input>
                <label>{value.label}</label>
                </div>
              );
            })}
          </div>
        </div>
    } else if (type == "Custom Checkbox") {
    } else if (type == "Radio Button") {
    } else if (type == "Custom Radio Button") {
    } else if (type == "Multiple Select") {
    } else if (type == "Date") {
    } else if (type == "Date Time") {
    } else if (type == "Time") {
    }
  };
  render() {
    return (
      <div>
        <div className="Heading_about">
          <p>PRODUCT DETAILS</p>
          <hr />
        </div>
        <div className="individualproduct_detail_outer_box">
          {this.props.productDetails.additionalImages &&
          this.props.productDetails.additionalImages.length > 0 ? (
            <div className="similar_product_images">
              <IoIosArrowUp id="upIconNew" />
              <div className="similar_image_three_image_box">
                {this.props.productDetails.additionalImages.map(
                  (image, key) => {
                    return (
                      <img
                        key={key}
                        className="similar_particular_image"
                        src={siteUrl + image.image}
                        alt="RELOAD"
                      />
                    );
                  }
                )}
              </div>

              <IoIosArrowDown
                id="upIconNew"
                style={{ marginTop: "1.684vw" }}
              ></IoIosArrowDown>
            </div>
          ) : (
            ""
          )}
          <div className="product_big_image_cart_compare">
            <img
              className="big_image"
              src={
                this.props.productDetails.baseImage
                  ? siteUrl + this.props.productDetails.baseImage.image
                  : "https://via.placeholder.com/150"
              }
              alt="Loading"
            />
            <div
              className="buttons_compare individual_buttons_compare "
              style={{ marginTop: "1.025vw"}}
            >
              <button
                className="cart_button individual_cart_button w-100 m-0"
                onClick={(e) => {
                  var arr = Array.from(this.state.selectedStockArray)
                  for(var i = 0; i < arr.length; i++) {
                    if(Array.isArray(arr[i])){
                      if(arr[i].length ==1){
                        arr[i] = arr[i][0]
                      }else
                        arr[i] = arr[i].join("-")
                    }
                  }
                  arr = arr.join("-").split("-").sort().filter(ele=>ele != "")
                  console.log(arr)
                  for(var key of Object.keys(this.state.stock)){
                    console.log(key)
                  }
                  // this.props.addToCart(
                  //   this.props.productDetails._id,
                  //   this.state.qty,
                  //   this.state.stockId
                  // );
                }}
              >
                <span className="large_screen_text ">ADD TO CART</span>
                <span className="small_screen_text individual_">ADD</span>{" "}
                <BiCart
                  className="individual_bicart"
                  style={{
                    // color: 'white',
                    marginTop: "-0.5vw",
                    fontSize: "1.3vw",
                  }}
                />
              </button>
              <button className="compare_button individual_compare_button">
                COMPARE
              </button>
            </div>
          </div>
          <div className="details_of_individual_product_with_rating">
            <p className="name_of_the_particular_product">
              {this.props.productDetails.name}
            </p>
            <div className="category_of_that_particular_product_box">
              {this.props.productDetails.categories.map((category, key) => {
                return (
                  <p className="category_of_that_particular_product" key={key}>
                    {category.name}
                  </p>
                );
              })}
            </div>
            <div className="rating_product individual_rating_product">
              <div className="star">
                <i
                  className={
                    this.props.productDetails.rating > 0
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 1
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 2
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 3
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
                <i
                  className={
                    this.props.productDetails.rating > 4
                      ? "fas fa-star"
                      : "far fa-star"
                  }
                  style={{ color: "yellow" }}
                ></i>
              </div>
              <p className="text_rating individual_text_rating">
                {this.props.productDetails.rating
                  ? this.props.productDetails.rating.toFixed(1)
                  : 0}
                ({this.props.reviews.length} Ratings)
              </p>
            </div>
            <hr className="product_individual_detail_line" />
            <div className="details_box_margin">
              {this.props.productDetails.specialPrice ? (
                <React.Fragment>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">MRP:</p>
                    <p className="price_of_the_product individual_price_of_the_product">
                      {this.props.productDetails.price}
                    </p>
                  </div>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">
                      Our Price:
                    </p>
                    <p className="price_of_the_product_after_discount individual_price_of_the_product_after_discount">
                      Rs.{" "}
                      {this.props.productDetails.specialPrice
                        ? this.props.productDetails.specialPriceType == "Fixed"
                          ? this.props.productDetails.specialPrice
                          : this.props.productDetails.price.toString() -
                            (this.props.productDetails.specialPrice.toString() /
                              100) *
                              this.props.productDetails.price.toString()
                        : this.props.productDetails.price}
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <div className="rating_product">
                  <p className="mrp_text">MRP:</p>
                  <p className="price_of_the_product">
                    {this.props.productDetails.price}
                  </p>
                </div>
              )}
              {this.props.productDetails.specialPrice ? (
                <React.Fragment>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">
                      {" "}
                      Discount:
                    </p>
                    <p className="how_much_discount individual_how_much_discount">
                      {this.props.productDetails.specialPriceType == "Fixed"
                        ? Math.trunc(
                            ((this.props.productDetails.price -
                              this.props.productDetails.specialPrice) /
                              this.props.productDetails.price) *
                              100
                          )
                        : this.props.productDetails.specialPrice}
                      % OFF
                    </p>
                  </div>
                  <div className="save_box individual_save_box">
                    <p className="save_text individual_save_text">You save:</p>
                    <p className="discount_amount individual_discount_amount">
                      Rs{" "}
                      {this.props.productDetails.price -
                        this.props.productDetails.specialPrice}
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}

              {/* <div className="save_box">
                <p className="delivery_text">Delivery in:</p>
                <p className="time_delivery">10 days after ordering</p>
              </div> */}
              {this.props.productDetails.options.map((option, key) => {
                return this.getOption(
                  option.type,
                  option.name,
                  option.required,
                  option.value,
                  key
                );
              })}

              <div className="save_box individual_save_box individual_save_column">
                <p className="color_text individual_color_text"> Qty:</p>
                <input
                  className="product-qty individual_product-qty  product-input"
                  type="number"
                  step="1"
                  placeholder="1"
                  min="1"
                  value={this.state.qty}
                  onChange={(e) => {
                    this.setState({ qty: e.target.value });
                  }}
                />
              </div>
            </div>
            {this.props.productDetails.SKU != "" ? (
              <div className="save_box">
                <p
                  className="delivery_text"
                  style={{ width: "auto", marginLeft: "0" }}
                >
                  Product Code:
                </p>
                <p className="time_delivery">{this.props.productDetails.SKU}</p>
              </div>
            ) : (
              ""
            )}
            <div className="pay_via">
              <p
                className="save_text individual_save_text individual_pay_text"
                style={{ marginLeft: "-0.952vw", marginTop: "1.025vw" }}
              >
                Pay via:
              </p>
              {!this.props.footerLoading && (
                <div className="logo2pay">
                  <img
                    src={
                      siteUrl +
                      this.state.footerDetails.Footer
                        .AcceptedPaymentMethodsImage.image
                    }
                  />
                </div>
              )}
            </div>
            {!this.props.featuresLoading &&
            this.props.allFeatures.Features &&
            this.props.allFeatures.Features.SectionStatus ? (
              <div className="Free_box w-100 m-0">
                {this.props.allFeatures.Features.Features.filter((feature) => {
                  if (
                    feature.Icon != "" &&
                    feature.SubTitle != "" &&
                    feature.Title != ""
                  )
                    return true;
                  return false;
                }).map((feature, key) => {
                  return (
                    <div className="Free_Shipping" key={key}>
                      <i className={feature.Icon}></i>
                      <div className="shipping_text">
                        <p className="shipping_text1">{feature.Title}</p>
                        <p className="shipping_text2">{feature.SubTitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    footerData: state.getFooter.footerData,
    footerLoading: state.getFooter.loading,
    featuresLoading: state.getFeatures.loading,
    allFeatures: state.getFeatures.features,
  };
};
export default connect(mapStateToProps, { addToCart })(
  IndividualProductDetails
);
