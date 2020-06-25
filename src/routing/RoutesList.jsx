

// Pages import

import AllSections from "../pages/AllSections";
import Exchanges from "../pages/Exchanges";
import Companies from "../pages/Companies";

// icons import
import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
import WorldSmallIcon from '@atlaskit/icon/glyph/world-small';
import OfficeBuildingFilledIcon from '@atlaskit/icon/glyph/office-building-filled';
const basePath = ""

const Routes = [
  {
    path:  basePath +  "/exchanges/",
    component: Exchanges,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Exchanges",
    navbarIcon:WorldSmallIcon
  },
  {
    path:  basePath +  "/companies/",
    component: Exchanges,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "Companies",
    navbarIcon:OfficeBuildingFilledIcon
  },
  {
    path:  basePath +  "/sections/",
    component: AllSections,
    pageType:"dashboard",
    viewLevel:1,
    redirect:false,
    navbarDisplayName: "All Sections",
    navbarIcon:MediaServicesSpreadsheetIcon
  },

  // { redirect: true, path:  basePath +  "/adminpanel", to: "/adminpanel/home" }
];

export default Routes;
