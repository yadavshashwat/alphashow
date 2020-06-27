// React
import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Legend,Tooltip } from 'recharts';
// Styles
import "../css/dashboard.css"

// Backend Connection
import { api_get } from "../helpers/api.js";
// Redux 
import { connect } from "react-redux";

// Redux dispatch
import { bindActionCreators } from "redux";
import flag from "../redux/actions/flag";
// import section from "../redux/actions/section";


// Atlaskit Packages
import { Grid, GridColumn } from '@atlaskit/page';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button';

//Icons
import pathIcon from "../routing/BreadCrumbIcons"

// Components
import ContentWrapper from '../components/ContentWrapper';

// Other Packages
var changeCase = require("change-case");

// api url path
var url = "/crud_company_prices/";



var emptyCompanyData = {
  id: 0,
  name: "",
  isin_no: "",
  is_listed_nse: true,
  nse_ticker: "",
  industry_sector: null,
  nse_tracker: true,
  nse_price_update_db_date: "",
  nse_return_update_date: "",
  created_at: "",
  modified_at: ""
  }

class IndividualCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricingData: [],
      filteredPricingData: [],
      companyData:emptyCompanyData,
      returnData:{},
      isinNum:"",
      // pagination variables
      loaded: false,
      // filter variables
      totalRecords:0,
      dateRangeSelected:"max"
    };
  }



  

  applyFilter = obj => {
    this.setState({ loaded: false });
    let payloadData = {
      operation: "read",
      // Basic Filters
      sort_by: this.state.sortValue ? this.state.sortValue.value : "",
      order_by: this.state.orderBy,
      search: this.state.searchValue,
      page_num: 1,
      page_size: this.state.pageSize.value,
      exchange: (this.state.exchangeValue).map(x => x['value']).join(","),
    };
    let payload = Object.assign({}, payloadData, obj);
    // console.log(payload, "Payload");
    api_get(url, payload)
      .then(response => {
        const { result, status, num_pages, total_records } = response;
        if (status) {
          this.setState({
            data: result,
            loaded: true,
            filteredRecords:total_records,
            numPages: num_pages
          });
        }
      })
      .catch(error => {
        console.log("Handle Filter Failed");
      });
  };

  // Filters Handling

  handleDateOnClick = data => {
    // const amount_dates = e.target.dataset.id;
    let totalData = this.state.pricingData;
    let filteredData = [];
    if (data == "max"){
       filteredData = totalData;
    }else{
      var total_range = totalData.length
      var start = total_range - parseInt(data)
      if (start < 0){
        start = 0
      }
       filteredData = totalData.slice(start,total_range);
    }
    
    console.log(totalData,filteredData)
    this.setState({filteredPricingData:filteredData,dateRangeSelected:data})
  }
  
  // On Load
  componentDidMount() {
  
    var Path = window.location.pathname.split("/")
    // this.props.actions.setEmptyEditTest({});
    // this.props.actions.setEmptyEditSection({});
    var isinNum = null;
    
    isinNum = decodeURIComponent(Path[2])
    // console.log(isinNum)
    this.setState({isinNum:isinNum})

    api_get(url, { operation: "read",isin:isinNum}).then(response => {
      const { result,  status} = response;
      
      if (status) {
        this.setState(
          {
            companyData:result['company'],
            pricingData : result['prices'],
            filteredPricingData : result['prices'],
            loaded: true,
            // countryOptions: filter.exchange_country,
          }
        );
      }
    });
  }

  render() {
    // const caption = "User Lists";

    let breadCrumbElement = null
    var Path = window.location.pathname.split("/")
    var textPath = null;
    breadCrumbElement = Path.map((row, index) => {
      if (index > 0 && index < (Path.length - 1)) {
        var link = (Path.slice(0, index + 1).join("/")) + "/"
        if (row == this.state.isinNum){
          textPath = changeCase.titleCase(this.state.companyData.name)
        }else{
          textPath = changeCase.titleCase(Path[index])
        }
        
        // console.log(link)
        try {
            return (<BreadcrumbsItem key={index} iconBefore={pathIcon[Path[index]]} href={link} text={textPath} />);
        }
        catch (err) {
          return (<BreadcrumbsItem key={index} href={link} text={textPath} />);
        }

        } 
      }
    );

    let renderTickerDetailsNSE = null;
    renderTickerDetailsNSE = this.state.companyData.is_listed_nse ? <GridColumn medium={2}><div className="tickerDetailLozenge"><Lozenge isBold appearance={"new"}>&nbsp;&nbsp;NSE&nbsp;&nbsp;</Lozenge><Lozenge appearance={"new"}>&nbsp;&nbsp;{this.state.companyData.nse_ticker}&nbsp;&nbsp;</Lozenge></div></GridColumn> : "";
      

    // let pricingData = this.state.pricingData

    
    let renderPriceGraph = null;
    renderPriceGraph = <LineChart width={1000} height={300} data={this.state.filteredPricingData} 
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend iconSize={14} iconType="plainline"/>
                          <Line type="monotone" dataKey="Price NSE" stroke="#8884d8" dot={false}/>
                      </LineChart>
                      

    return (
      <ContentWrapper>
        { !this.props.testId && (
          <BreadcrumbsStateless>{breadCrumbElement}</BreadcrumbsStateless>
        )}
      <br></br>
      <Grid spacing="compact">
        <GridColumn>
          <h2>{changeCase.titleCase(this.state.companyData.name)}</h2>
        </GridColumn>
      </Grid>
      <Grid spacing="compact">
        {renderTickerDetailsNSE}
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={12}>
        {renderPriceGraph}
          <div className='button-row'>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="max"} onClick={() => this.handleDateOnClick("max")} >Max</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="1250"} onClick={() => this.handleDateOnClick("1250")}>5 Year</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="250"} onClick={() => this.handleDateOnClick("250")}>1 Year</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="125"}onClick={() => this.handleDateOnClick("125")}>6 Month</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="63"}onClick={() => this.handleDateOnClick("63")}>3 Month</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="22"} onClick={() => this.handleDateOnClick("22")}>1 Month</Button></div>
            <div  className="time-button"><Button isSelected={this.state.dateRangeSelected=="7"} onClick={() => this.handleDateOnClick("7")}>7 Days</Button></div>
          </div>
          </GridColumn>
      </Grid>
      </ContentWrapper>

    );
  }
}

function mapStateToProps(store) {
  return {
    // ...store.section,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      // ...section, 
      ...flag }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualCompany);
