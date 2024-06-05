import BCSharedForm from 'app/components/bc-shared-form/bc-shared-form';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callCreateEstimatesAPI } from 'api/invoicing.api';
import styles from '../estimates.styles';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { FormDefaultValues } from 'app/components/bc-shared-form/bc-shared-form-default-values';
import { FormTypes } from 'app/components/bc-shared-form/bc-shared-form.types';
import { getCustomerDetailAction, resetCustomer, getCustomers } from 'actions/customer/customer.action';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';
import { getAllSalesTaxAPI } from 'api/tax.api';
import {formatCurrency} from "../../../../../helpers/format";

function CreateEstimates({ classes }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const customer = useSelector(({ customers }:any) => customers.customerObj);
  const customers = useSelector(({ customers }: any) => customers.data);
  const { 'items': invoiceItems } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const taxes = useSelector(({ tax }: any) => tax.data);

  const getCustomersDispatcher = () => {
    dispatch(getCustomers());
  }

  const getSharedFormInitialData = () => {
    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllSalesTaxAPI());
  }

  const getCustomerDetailActionHandler = (customerId: string) => {
    dispatch(getCustomerDetailAction({ customerId }));
  }

  const resetCustomerHandler = () => {
    dispatch(resetCustomer());
  }

  const openPreviewFormModalHandler = (modalDataAction:any) => {
    dispatch(setModalDataAction(modalDataAction));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 10);
  }

  const columns = [
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Item',
      'borderRight': true,
      'fieldName': 'name',
      'fieldType': 'input',
      'id': 'invoice-name',
      'inputType': 'text',
      'sortable': false,
      'width': 450
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Quantity',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'quantity',
      'fieldType': 'input',
      'id': 'invoice-quantity',
      'inputType': 'number',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Price',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'price',
      'fieldType': 'input',
      'id': 'invoice-price',
      'inputType': 'number',
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return null;
      },
      'Header': 'Tax %',
      'borderRight': true,
      'className': 'font-bold',
      'fieldName': 'tax',
      'fieldType': 'select',
      'id': 'invoice-tax',
      'inputType': null,
      'width': 80
    },
    {
      'accessor': (originalRow: any) => formatCurrency(originalRow.taxAmount),
      'Header': 'Tax Amount',
      'borderRight': true,
      'currency': true,
      'fieldName': 'taxAmount',
      'fieldType': 'text',
      'id': 'invoice-taxAmount',
      'inputType': null,
      'sortable': false,
      'width': 60
    },
    {
      'accessor': (originalRow: any) => formatCurrency(originalRow.total),
      'Header': 'Total',
      'borderRight': true,
      'currency': true,
      'fieldName': 'total',
      'fieldType': 'text',
      'id': 'invoice-total',
      'inputType': null,
      'sortable': false,
      'width': 60
    }
  ];
  const item = {
    'description': '',
    'name': '',
    'price': 0,
    'quantity': 1,
    'tax': 0,
    'taxAmount': 0,
    'total': 0,
    'unit': 'Fixed'
  };

  const redirectURL = '/main/invoicing/estimates';

  const handleFormSubmit = (data: any) => {
    return new Promise((resolve, reject) => {
      data.items = JSON.stringify(data.items.map((o: any) => {
        o.description = o.name;
        o.price = parseFloat(o.price);
        o.quantity = parseInt(o.quantity);
        delete o.taxAmount;
        delete o.total;
        delete o.unit;
        return o;
      }));
      callCreateEstimatesAPI(data).then((response: any) => {
        history.push(redirectURL);
        // Missing an argument
        // remove response from argument
        return resolve(response);
      })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCSharedForm
            columnSchema={columns}
            formTypeValues={FormDefaultValues[FormTypes.ESTIMATE]}
            itemSchema={item}
            onFormSubmit={handleFormSubmit}
            pageTitle={'New Estimate'}
            redirectUrl={redirectURL}
            customer={customer}
            getCustomerDetailActionHandler={getCustomerDetailActionHandler}
            resetCustomerHandler={resetCustomerHandler}
            openPreviewFormModalHandler={openPreviewFormModalHandler}
            invoiceItems={invoiceItems}
            taxes={taxes}
            getSharedFormInitialData={getSharedFormInitialData}
            customers={customers}
            getCustomersDispatcher={getCustomersDispatcher}
          />
        </div>
      </div>
    </div >
  );
}

export default withStyles(styles, { 'withTheme': true })(CreateEstimates);
