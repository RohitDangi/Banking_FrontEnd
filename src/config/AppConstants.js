const loginType = {
    USER: "1",
    ADMIN: "2"
}

var firebaseConfig = {
    apiKey: "AIzaSyCfWI-Lp_cvjMDX5pdsA2BpAjVjIWfYeaQ",
    authDomain: "wastau-83367.firebaseapp.com",
    databaseURL: "https://wastau-83367-default-rtdb.firebaseio.com",
    projectId: "wastau-83367",
    storageBucket: "wastau-83367.appspot.com",
    messagingSenderId: "879832953496",
    appId: "1:879832953496:web:5b22196047db26188b96ed",
    measurementId: "G-1PN70V61M8"
  };

  const taskStatus =[
    {
        value:"live",
        label:"Live",
    }, {
        value:"confirmed",
        label:"Confirmed",
    }, {
        value:"onTheWay",
        label:"On The Way",
    },{
        value:"vendorReachedLocation",
        label:"Vendor Reached Location",
    },{
        value:"completed",
        label:"Completed",
    },{
        value:"cancelled",
        label:"Cancelled",
    }
];
const paymentTypeStatus =[
    {
        value:"free",
        label:"Free",
    }, {
        value:"paid",
        label:"Paid",
    }
];

const SERVER_ERROR = "Something went on server.";
// Used to show date and time ui
const LOCAL_DATE_FORMAT = "MMMM DD, YYYY";
const LOCAL_DATE_TIME_FORMAT = "MMMM DD, YYYY hh:mm A";
const LOCAL_DATE_S_FORMAT = "MMM DD, YYYY HH:mm A";
const LOCAL_DATE_TIME_SHORT_FORMAT = "MMM DD, YYYY hh:mm A";
const LOCAL_DATE_SHORT_FORMAT = "MMM DD, YYYY";
// Used while sending data on sever
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:MM";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

//Used in date picker
const DATE_PICKER_DATE_AND_TIME_FORMAT = "MMMM dd, yyyy hh:mm: a"
const DATE_PICKER_DATE_FORMAT = "MMMM dd, yyyy"; /*"")*/
const DATE_PICKER_TIME_FORMAT = "p";
const LOCAL_DATE_SHORTS_FORMAT = "MMM dd, yyyy";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const minutes = [0, 15, 30, 45]
const APP_VERSION = "1";
const days = [{
    value: 7,
    label: 'Sunday'
}, {
    value: 1,
    label: 'Monday'
}, {
    value: 2,
    label: 'Tuesday'
}, {
    value: 3,
    label: 'Wednesday'
}, {
    value: 4,
    label: 'Thursday'
}, {
    value: 5,
    label: 'Friday'
}, {
    value: 6,
    label: 'Saturday'
}]
const modalData = {
    modalStyle: {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 0, 0, 0.7)'
        },
        content: {
            margin: '0% auto',
            width: 'unset',
            border: 'none',
            background:'none'
        }
    },
    confirmationPopUpStyple : {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 0, 0, 0.7)'
        },
        content: {
            width: '40%',
        } 
    },
    pageLength: 10
}


const SIZE_PER_PAGE = 10;
const NO_DATA_TEXT = "No entries available.";

const roles = {
    admin: {
        name: "admin",
        displayName: "Admin"
    },
    counsellor: {
        name: "counsellor",
        displayName: "Counsellor"
    },
    evaluator: {
        name: "evaluator",
        displayName: "Evaluator"
    },
    trainer: {
        name: "trainer",
        displayName: "Trainer"
    },
    superAdmin: {
        name: "superAdmin",
        displayName: "Super Admin"
    }
}

const data = {
    modalStyle: {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 34, 72, 1)'
        },
        content: {
            margin: '0% auto',
            width: 'unset',
            border: 'none',
            background:'none'
        }
    },
    confirmationPopUpStyple : {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 34, 72, 1)'
        },
        content: {
            width: '40%',

        } 
    },
    pageLength: 10
}



const namePrefixes =[
    {
        value:"Mr.",
        label:"Mr.",
    }, {
        value:"Mrs.",
        label:"Mrs.",
    },{
        value:"Miss",
        label:"Miss",
    },{
        value:"Others",
        label:"Others",
    }
] ;


export default {
    firebaseConfig,
    modalData,
    SERVER_ERROR,
    loginType,
    taskStatus,
    paymentTypeStatus,
    DATE_FORMAT,
    LOCAL_DATE_FORMAT,
    LOCAL_DATE_SHORT_FORMAT,
    LOCAL_DATE_TIME_SHORT_FORMAT,
    DATE_TIME_FORMAT,
    DATE_PICKER_DATE_FORMAT,
    DATE_PICKER_TIME_FORMAT,
    DATE_PICKER_DATE_AND_TIME_FORMAT,
    weekDays,
    days,
    hours,
    minutes,
    APP_VERSION,
    SIZE_PER_PAGE,
    NO_DATA_TEXT,
    LOCAL_DATE_TIME_FORMAT,
    ROLES: roles,
    DATA:data,
    TIME_FORMAT,
    LOCAL_DATE_SHORTS_FORMAT,
    LOCAL_DATE_S_FORMAT,
    namePrefixes,
};