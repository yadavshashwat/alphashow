// React
import React, { Component } from 'react';
// Styles
import "../css/dashboard.css"

// Backend Connection
import { api } from "../helpers/api.js";
// Redux 
import { connect } from "react-redux";

// Redux dispatch
import { bindActionCreators } from "redux";
import flag from "../redux/actions/flag";
// import section from "../redux/actions/section";


// Atlaskit Packages
import Select from "@atlaskit/select";
import SearchIcon from "@atlaskit/icon/glyph/search";
import { CheckboxSelect } from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { Grid, GridColumn } from '@atlaskit/page';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Lozenge from '@atlaskit/lozenge';
import DynamicTable from '@atlaskit/dynamic-table';

//Icons
import ArrowDownCircleIcon from '@atlaskit/icon/glyph/arrow-down-circle';
import ArrowUpCircleIcon from '@atlaskit/icon/glyph/arrow-up-circle';
import pathIcon from "../routing/BreadCrumbIcons"

// Components
import ContentWrapper from '../components/ContentWrapper';

// Other Packages
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
var changeCase = require("change-case");

// api url path
var url = "/crud_company/";


const itemOptions = [
  {'value':10,'label':'10 Items/Page'},
  {'value':20,'label':'20 Items/Page'},
  {'value':30,'label':'30 Items/Page'},
  {'value':50,'label':'50 Items/Page'},
  {'value':100,'label':'100 Items/Page'}
]


class AllCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // pagination variables
      loaded: false,
      pageNum: 1, //Current page
      pageSize: {'value':50,'label':'50 Items/Page'},
      // filter variables
      totalRecords:0,
      filteredRecords:0,
      sortByOptions: [],
      orderByOptions: [],

      sortValue: "",
      orderBy: "asc",

      searchIcon: true,
      exchangeOptions: [],
      exchangeValue: [],
      searchValue: "",
    };
  }

  hideSearchIcon = () => {
    this.setState({ searchIcon: false });
  };

  showSearchIcon = event => {
    if (event.target.value === "") {
      this.setState({ searchIcon: true });
    }
  };


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
    api(url, payload)
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

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({ pageNum: selected + 1 }, () => {
      this.applyFilter({ page_num: selected + 1 });
    });

  };

  handleSortChange = value => {
    this.setState({ sortValue: value ? value : "", pageNum: 1 }, () => {
      this.applyFilter({ sort_by: value ? value.value : "", page_num: 1 });
    });
  };



  handleNumItemsChange = value => {
    this.setState({ pageSize: value ? value: "" , pageNum: 1 }, () => {
      this.applyFilter({ page_size: value ? value.value: "" , page_num: 1 });
    });
  }

  toggleOrderBy = () => {
    let orderBy = this.state.orderBy;
    let toggle = orderBy === "asc" ? "desc" : "asc";
    this.setState({ orderBy: toggle });
    if (this.state.sortValue !== "") {
      this.setState({ pageNum: 1 }, () => {
        this.applyFilter({ order_by: toggle, page_num: 1 });
      });
    }
  };

  handleSearchChange = event => {
    const data = event.target.value
    this.setState({ searchValue: data, pageNum: 1 }, () => {
      this.applyFilter({ search: data, page_num: 1 });
    });
  }


  handleExchangeChange = value => {
    const data = (value).map(x => x['value']).join(",");
    this.setState({ exchangeValue: value, pageNum: 1 }, () => {
      this.applyFilter({ exchange: data, page_num: 1 });
    });
  };


  // On Load
  componentDidMount() {
  
    api(url, { operation: "read", page_num: this.state.pageNum, page_size: this.state.pageSize.value}).then(response => {
      const { result, filter, status, num_pages, total_records } = response;
      
      if (status) {
        this.setState(
          {
            totalRecords: total_records,
            data : result,
            filteredRecords : total_records,
            loaded: true,
            numPages: num_pages,
            sortByOptions: filter.sort_by,
            orderByOptions: filter.order_by,
            // countryOptions: filter.exchange_country,
          }
        );
      }
    });
  }


  render() {
    // const caption = "User Lists";
    const SearchIconContainer = styled.div`
      position: absolute;
      top: 49px;
      left: 20px;
    `;
    

    const DataWrapper = styled.div`
      width: 100%;
      padding-top:15px;
  `  ;

    const SortIconContainer = styled.div`
      margin-top:46px;
      cursor:pointer
  `  ;


    let breadCrumbElement = null
    var Path = window.location.pathname.split("/")
    var textPath = null;
    breadCrumbElement = Path.map((row, index) => {
      if (index > 0 && index < (Path.length - 1)) {
        var link = (Path.slice(0, index + 1).join("/")) + "/"
        textPath = changeCase.titleCase(Path[index])
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

    let orderByIcon = <SortIconContainer><ArrowUpCircleIcon></ArrowUpCircleIcon></SortIconContainer>
    if (this.state.orderBy === "asc") {
      orderByIcon = <SortIconContainer><ArrowUpCircleIcon onClick={this.toggleOrderBy} className="sortIcon"></ArrowUpCircleIcon></SortIconContainer>
    } else {
      orderByIcon = <SortIconContainer><ArrowDownCircleIcon onClick={this.toggleOrderBy} className="sortIcon"></ArrowDownCircleIcon></SortIconContainer>
    }

    const head = {
      cells: [
        {
          key: "name",
          content: "Name",
          width: 30,
          isSortable: false,
          shouldTruncate: false
        },
        {
          key: "isin",
          content: "ISIN",
          width: 10,
          isSortable: false,
          shouldTruncate: false
        },
        {
          key: "exchanges",
          content: "Exchanges",
          width: 10,
          isSortable: false,
          shouldTruncate: false
        },
        {
          key: "ticker",
          content: "Ticker",
          width: 20,
          isSortable: false,
          shouldTruncate: false
        },
        {
          key: "price_date_range",
          content: "Price Date Range",
          width: 20,
          isSortable: false,
          shouldTruncate: false
        },
        {
          key: "return_update_date",
          content: "Return Update Date",
          width: 10,
          isSortable: false,
          shouldTruncate: false
        },

      ]
    }

    let rowRenderElement = null;
    rowRenderElement = this.state.data.map((row, index) => ({
      key: `row.id`,
      cells: [

        {
          key: row.id,
          content: changeCase.titleCase(row.name)
        },
        {
          key: row.id,
          content: row.isin_no
        },
        {
          key: row.id,
          content: row.is_listed_nse ? <Lozenge appearance="inprogress">NSE</Lozenge> : ""
        },
        {
          key: row.id,
        content: row.is_listed_nse ? <div class="lozenge-exchange">NSE:<div class="lozenge-ticker">{row.nse_ticker}</div></div> : ""
        },
        {
          key: row.id,
          content: row.is_listed_nse ? 'NSE: ' + row.min_nse_ticker_date + " - " +row.last_nse_ticker_date : ""
        },
        {
          key: row.id,
          content: row.nse_return_update_date
        },
      ]
    }
    ));





    return (
      <ContentWrapper>
        { !this.props.testId && (
          <BreadcrumbsStateless>{breadCrumbElement}</BreadcrumbsStateless>
        )}
        <Grid spacing="compact">
          <GridColumn medium={2}>
            <div className="field-div">
              {this.state.searchIcon === true && (
                <SearchIconContainer>
                  <SearchIcon />
                </SearchIconContainer>
              )}
              <span className="field-label">Search</span>
              <TextField
                onFocus={this.hideSearchIcon}
                onBlur={this.showSearchIcon}
                onChange={this.handleSearchChange}
                value={this.state.searchValue}
                appearance="standard"
              />
            </div>
          </GridColumn>
          <GridColumn medium={4}>
            <div className="field-div">
              <span className="field-label">Exchange</span>
              <CheckboxSelect
                className="checkbox-select"
                classNamePrefix="select"
                options={this.state.exchangeOptions}
                placeholder="NSE etc."
                onChange={this.handleExchangeChange}
                value={this.state.exchangeValue}
              />
            </div>
          </GridColumn>
          <GridColumn medium={3}>
          </GridColumn>
          <GridColumn medium={2}>
            <div className="field-div">
              <span className="field-label">Sort</span>
              <Select
                className="single-select"
                isClearable
                classNamePrefix="react-select"
                options={this.state.sortByOptions}
                placeholder="Sort By"
                value={this.state.sortValue}
                onChange={this.handleSortChange}
              />
            </div>
          </GridColumn>
          <GridColumn medium={1}>
            {orderByIcon}
          </GridColumn>
        </Grid>
        <Grid spacing="compact">
          <DataWrapper>
            <div className="question-bank-summary">
              <div className="question-bank-summary-text">
                  Total: 
                <span className="number-selected">
                  {((this.state.totalRecords === this.state.filteredRecords) ? this.state.totalRecords : this.state.filteredRecords + '/' + this.state.totalRecords)}
                </span>
              </div>
            </div>
            <br></br>
            <DynamicTable
              isLoading={!this.state.loaded}
              head={head}
              rows={rowRenderElement}
              defaultPage={1}
              className="test-table"
            />
              <Grid>
                <GridColumn medium={10}>
                {(this.state.loaded && this.state.numPages > 1) && (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.state.numPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  previousClassName={'pagination-next'}
                  nextClassName={'pagination-next'}
                  subContainerClassName={'pages-pagination'}
                  activeClassName={'active'}
                  forcePage={this.state.pageNum - 1}
                />
                )}
                </GridColumn>
                <GridColumn medium={2}>            
                <div className="field-div-pagination">
                <Select
                  name="numItems"
                  options={itemOptions}
                  // placeholder="4,5,6..."
                  onChange={this.handleNumItemsChange}
                  value={this.state.pageSize}
                />
                </div>
                </GridColumn>
              </Grid>
          </DataWrapper>
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
)(AllCompanies);
