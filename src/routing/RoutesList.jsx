

// Pages import

import AllSections from "../pages/AllSections";

// icons import
import MediaServicesSpreadsheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';


const basePath = ""
const Routes = [
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
