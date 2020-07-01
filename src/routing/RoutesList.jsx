

// Pages import

// import AllSections from "../pages/AllSections";
import Exchanges from "../pages/Exchanges";
import Companies from "../pages/Companies";
import IndividualCompany from "../pages/IndividualCompany";
import IndividualIndex from "../pages/IndividualIndex";
import Indexes from "../pages/Indexes";
import Strategies from "../pages/Strategies";

// icons import
// import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
import MarketplaceIcon from '@atlaskit/icon/glyph/marketplace';
import OfficeBuildingFilledIcon from '@atlaskit/icon/glyph/office-building-filled';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import GraphBarIcon from '@atlaskit/icon/glyph/graph-bar';


const basePath = ""

const Routes = [
  {
    path:  basePath +  "/exchanges/",
    component: Exchanges,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Exchanges",
    navbarIcon:MarketplaceIcon
  },
  {
    path:  basePath +  "/companies/",
    component: Companies,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Companies",
    navbarIcon:OfficeBuildingFilledIcon
  },
  {
    path:  basePath +  "/companies/:isin",
    component: IndividualCompany,
    pageType:"dashboard",
    viewLevel:2,
    redirect:false,
    navbarDisplayName: "Companies",
    navbarIcon:OfficeBuildingFilledIcon
  },
  {
    path:  basePath +  "/indexes/",
    component: Indexes,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Indexes",
    navbarIcon:BacklogIcon
  },
  {
    path:  basePath +  "/indexes/:ticker",
    component: IndividualIndex,
    pageType:"dashboard",
    viewLevel:2,
    redirect:false,
    navbarDisplayName: "Indexes",
    navbarIcon:BacklogIcon
  },
  {
    path:  basePath +  "/strategies/",
    component: Strategies,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Strategies",
    navbarIcon:GraphBarIcon
  },

  // {
  //   path:  basePath +  "/sections/",
  //   component: AllSections,
  //   pageType:"dashboard",
  //   viewLevel:1,
  //   redirect:false,
  //   navbarDisplayName: "All Sections",
  //   navbarIcon:MediaServicesSpreadsheetIcon
  // },

  // { redirect: true, path:  basePath +  "/", to: basePath +"/companies/" }
];

export default Routes;
