

// Pages import

// import AllSections from "../pages/AllSections";
import Exchanges from "../pages/Exchanges";
import Companies from "../pages/Companies";
import IndividualCompany from "../pages/IndividualCompany";
import Indexes from "../pages/Indexes";

// icons import
// import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
import MarketplaceIcon from '@atlaskit/icon/glyph/marketplace';
import OfficeBuildingFilledIcon from '@atlaskit/icon/glyph/office-building-filled';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';

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
    path:  basePath +  "/companies/:company",
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
    navbarDisplayName: "indexes",
    navbarIcon:BacklogIcon
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

  // { redirect: true, path:  basePath +  "/adminpanel", to: "/adminpanel/home" }
];

export default Routes;
