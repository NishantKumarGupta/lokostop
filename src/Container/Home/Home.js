import Header from "../Component/Header/Header";
import { FaShippingFast, FaRegClock } from "react-icons/fa";
import { MdSettingsBackupRestore, MdPayment } from "react-icons/md";
import "./Home.css";
import Footer from "../Component/Footer/Footer";
import FindByCategory from "../Component/Boxes/FindByCategory";
import Header01 from "../Component/Header/Header01";
import React, { Component } from "react";
import Search from '../Component/Header/Search'
import ProductRowBox from "../Component/Boxes/ProductRowBox";
import SixImageSlider from "../Component/Slider/SixImageSlider";
import ClientImage from "../Component/Slider/ClientImage";
import Slider from "../Component/Slider/Slider";
import CategoryBox from "../Component/Boxes/CategoryBox";
import MostViewedBox from "../Component/Boxes/MostViewedBox";
import TopClients from "../Component/Boxes/TopClients";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import {
  getFeatures,
  getProductTabs,
  getBanners
} from "../../Redux/Actions/StorefrontActions";
import TwoColBanner from "../Component/Slider/TwoColBanner";
import ThreeColBanner from "../Component/Slider/ThreeColBanner";
import OneColBanner from "../Component/Slider/OneColBanner";
import {Helmet} from "react-helmet";

class Home extends Component {  
  state = {
    products: [],
  };
  componentDidMount() {
    this.props.getFeatures();
    this.props.getProductTabs();
    this.props.getBanners()
    this.setState({ products: this.props.products });
  }
  render() {
    if (
      this.props.allProductRowsLoading ||
      this.props.featuresLoading ||
      this.props.bannersLoading 
    ) {
      return <Loader />;
    } else
      return (
        <div>
          <Helmet>
                    <title>{this.props.store.WelcomeText}</title>
                </Helmet>
          <Header01 />
          <Header />
          <Search home={true}/>
          {this.props.store.Slider._id && 
          <Slider slides={this.props.store.Slider.Slides} settings={this.props.store.Slider.Settings}/>
  }
          {this.props.allFeatures.Features &&
          this.props.allFeatures.Features.SectionStatus ? (
            <div className="Free_box">
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

          {/* <NewArrival products={[]}/> */}
          <ProductRowBox tab={this.props.allProductRows[0].Tabs[0]} />
          <ThreeColBanner />
          <MostViewedBox />
          <FindByCategory />
          <ProductRowBox tab={this.props.allProductRows[0].Tabs[1]} />
          <TwoColBanner />
          {/* <CategoryBox /> */}
          <TopClients />
          <ProductRowBox tab={this.props.allProductRows[0].Tabs[2]} />
          <OneColBanner />
          <ClientImage />
          <ProductRowBox tab={this.props.allProductRows[0].Tabs[3]} />
          <SixImageSlider />
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    productDetails: state.getProductDetails.product,
    allProductRows: state.getProductTabs.allTabs,
    allProductRowsLoading: state.getProductTabs.loading,
    featuresLoading: state.getFeatures.loading,
    allFeatures: state.getFeatures.features,
    bannersLoading: state.getBanners.loading,
    store: state.getStore.store
  };
};
export default connect(mapStateToProps, { getFeatures, getProductTabs, getBanners })(Home);
