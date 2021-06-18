import React, { Component } from 'react';
import {  LedgerActions } from "../../actions";
import Dashboard from "../Dashboard";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';
import Loader from "../Loader";
import appConstants from "../../config/AppConstants";
import moment from 'moment'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            historyList: [],
            customerFilter: "",
            text: "",
            deleteId: "",
            pages: 0,
            page: 1,
            sizePerPage: appConstants.SIZE_PER_PAGE,
            isLoading: false
        }
        this.fetchHistory = this.fetchHistory.bind(this);
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        this.fetchHistory()
    }

    fetchHistory() {
        this.setState({ isLoading: true })
        let { text, customerFilter, page, sizePerPage } = this.state;
        let dataToSend = {
            limit: sizePerPage,
            skip: (page - 1) * sizePerPage
        }
       
        LedgerActions
            .getHistory(dataToSend, (err, res) => {
                if (!err) {
                    let data = res && res.data && res.data;
                    let count = data.count;
                    // let pages = 0
                    // if (count > 0) {
                    //     if (count % sizePerPage === 0) {
                    //         pages = parseInt(count / sizePerPage)
                    //     } else {
                    //         pages = parseInt(count / sizePerPage) + 1
                    //     }
                    // }
                    this.setState({
                        historyList: data && data,
                        // pages,
                        isLoading: false
                    })
                }
            })
    }
 
   
    
    render() {
        let { historyList, customerFilter, text, pages } = this.state;
        return (
            <div id="page-container" className="sidebar-o enable-page-overlay side-scroll page-header-modern">

                <Dashboard></Dashboard>
                <main id="main-container">
                    <div className="content">
                        {
                            this.state.isLoading ?
                                <div className="custm-loader">
                                    <Loader></Loader>
                                </div> : null
                        }
                        <div className="row mb-30 mt-30">
                            <div className="col-6">
                                <h2 className="pt-0 mt-10 mb-0 font-size-md">History</h2>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block">
                                    <div className="block-header block-header-default">
                                        <div className="row w-100">
                                            <div className="col-lg-3">
                                                <h3 className="block-title">History</h3>
                                            </div>

                                            <div className="col-lg-9">
                                                <div className="text-right">
                                                    <ul className="filter-ul">
                                                        <li className="w-300px">
                                                           
                                                        </li>
                                                        
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="block-content block-content-full pt-30">
                                        <table className="table table-vcenter js-dataTable-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-black"><b>#</b></th>
                                                    <th className="text-black"><b>Date</b></th>
                                                    <th className="text-black"><b>Amount</b></th>
                                                    <th className="text-black"><b>Transaction Type</b></th>
                                                    <th className="text-black "><b>Prev. Amount</b></th>
                                                    <th className="text-black"><b>Updated Amount</b></th>

                                                </tr>
                                            </thead>
                                            <tbody>


                                                {
                                                    historyList.map((history, index) => {
                                                        return (
                                                            <tr>
                                                                <td className="">{index + 1}</td>
                                                                <td className="font-w600">{moment.utc(history.date).local().format(appConstants.DATE_FORMAT)}</td>
                                                                <td className="font-w600">{history && history.amount}</td>
                                                                <td className="font-w600">{history && history.transactionType}</td>
                                                                <td className="font-w600">{history && history.lastAmount}</td>
                                                                <td className="font-w600">{history && history.currentAmount}</td>

                                                                
                                                            </tr>
                                                        )

                                                    })

                                                }
                                            </tbody>
                                        </table>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        );
    }
}

export default History;