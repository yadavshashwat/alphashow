import _ from 'lodash';

export default _.mapKeys([


    // FLAGS
        'FLAG_ADD',
        'FLAG_DISMISS',
    // QUESTION RELATED
        
        'SET_TOTAL_RECORDS',
 
    // SECTION RELATED
        
        'SECTION_LIST_SET',
        'SECTION_REMOVE',
        'SET_SECTION_DEFAULT',
        
        // SECTION ADDITION SUBTRACTION EDITING
        'SECTION_ADD_SECTION',
        'SECTION_SET_EDIT_SECTION',
        'SECTION_SET_EMPTY_EDIT_SECTION',
        'SECTION_EDIT_SECTION',
        'SECTION_CHANGE_ORDER',
        
        // SECTION SELECTION
        'SECTION_SELECT_ADD_SECTION_ID',
        'SECTION_SELECT_REMOVE_SECTION_ID',
        'SECTION_SELECT_REMOVEALL_SECTION_ID',
        'SECTION_SELECT_ALL_SECTION_ID',
        'SECTION_DESELECT_ALL_SECTION_ID',

        //MOVE
        'SECTION_MOVE_ALL_SELECTED',

        //UI
        'VIEW_ADD_SECTIONBOX',
        'HIDE_ADD_SECTIONBOX',
        

]);