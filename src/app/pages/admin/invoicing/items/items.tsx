import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './items.styles';
import { Button, Fab, Grid, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { loadInvoiceItems } from 'actions/invoicing/items/items.action';

import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { PRIMARY_GREEN, PRIMARY_ORANGE, PRIMARY_RED, modalTypes } from '../../../../../constants';
import { Item } from 'actions/invoicing/items/items.types';
import { getAllSalesTaxAPI } from 'api/tax.api';
import BCInput from 'app/components/bc-input/bc-input';
import BCDebouncedInput from 'app/components/bc-input/bc-debounced-input';
import { addTierApi, updateItems } from 'api/items.api';
import { error as SnackBarError, success } from 'actions/snackbar/snackbar.action';
import BCQbSyncStatus from "../../../../components/bc-qb-sync-status/bc-qb-sync-status";
import {CSButton, CSButtonSmall} from "../../../../../helpers/custom";
import {stringSortCaseInsensitive} from "../../../../../helpers/sort";


interface Props {
  classes: any;
}

const normalizeTiers = (tiers:any) => {
  const obj:any = {};

  tiers.forEach((tier:any) => {
    obj[tier.tier._id] = tier;
  });

  return obj;
};


function AdminInvoicingItemsPage({ classes }:Props) {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector(({ invoiceItems }:RootState) => invoiceItems);
  const [localItems, setLocalItems] = useState(stringSortCaseInsensitive(items, 'name'));
  const [columns, setColumns] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);


  const { 'loading': tiersLoading, 'error': tiersError, tiers } = useSelector(({ invoiceItemsTiers }:any) => invoiceItemsTiers);
  const activeTiers = tiers.filter(({ tier }:any) => tier.isActive);

  const handleTierChange = (id: number, value: string, tierId: string) => {
    const newItems:any = [...localItems];
    const index = newItems.findIndex((item:any) => item._id === id);
    const currentTier:any = newItems[index].tiers[tierId];
    currentTier.charge = value;
    newItems[index].tiers[tierId] = currentTier;
    setLocalItems(newItems);
  };


  const handleUpdateAllTiers = async () => {
    setUpdating(true);
    let hasError:any = '';
    const payload = localItems.map((item:any) => {
      const tiers = Object.keys(item.tiers).map((tierId:any) => {
        if (item.tiers[tierId].tier.isActive && !item.tiers[tierId].charge) {
          if (!hasError) {
            hasError = tierId + item.tiers[tierId].tier.name;
          }
        }
        return {
          tierId,
          'charge': item.tiers[tierId].tier.isActive
            ? item.tiers[tierId].charge
            : undefined
        };
      });

      const activeTiers = tiers.filter(({ charge }) => charge);
      return {
        'itemId': item._id,
        'tiers': activeTiers
      };
    });

    if (hasError) {
      setUpdating(false);
      dispatch(SnackBarError('Please fill in all tier prices'));
    }

    if (payload && !hasError) {
      const response = await updateItems(payload).catch(err => {
        dispatch(SnackBarError(err.message));
        setEditMode(false);
      });
      if (response) {
        dispatch(success('Tier pricing successfully updated'));
        setEditMode(false);
        setUpdating(false);
      }
    }
  };

  const addTier = async () => {
    setUpdating(true);
    const response = await addTierApi()
      .catch(err => {
        dispatch(SnackBarError(err.message));
        setUpdating(false);
      });
    if (response) {
      dispatch(success(response.message));
      setUpdating(false);
      dispatch(loadInvoiceItems.fetch());
    }
  };

  const editTiers = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Update Tiers'
      },
      'type': modalTypes.EDIT_TIERS_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  function Toolbar() {
    return editMode
      ? <>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={() => setEditMode(false)}
          size={'small'}
          variant={'contained'}>
          {'Cancel'}
        </CSButton>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={handleUpdateAllTiers}
          size={'small'}
          style={{ 'backgroundColor': PRIMARY_RED,
            'color': 'white' }}
          variant={'contained'}>
          {'Submit'}
        </CSButton>
      </>
      : <>
        <CSButton
          disabled={updating}
          disableElevation
          onClick={editTiers}
          size={'small'}
          style={{
            'color': 'white',
            'backgroundColor': PRIMARY_ORANGE }}
          variant={'contained'}>
          {'Edit Tiers'}
        </CSButton>
        <CSButton
          color={'primary'}
          disabled={updating}
          disableElevation
          onClick={addTier}
          size={'small'}
          style={{
            'color': 'white' }}
          variant={'contained'}>
          {'Add Tier'}
        </CSButton>
        {/* <CSButton
          disabled={updating}
          disableElevation
          onClick={() => setEditMode(true)}
          size={'small'}
          style={{ 'backgroundColor': PRIMARY_GREEN,
            'color': 'white' }}
          variant={'contained'}>
          {'Edit Prices'}
        </CSButton> */}
        <CSButton
          color={'primary'}
          disabled={updating}
          disableElevation
          onClick={renderAdd}
          size={'small'}
          style={{
            'color': 'white' }}
          variant={'contained'}>
          {'New Item'}
        </CSButton>
      </>;
  }


  useEffect(() => {
    if (items.length > 0) {
      const newItems = items.map((item:any) => ({
        ...item,
        'tiers': normalizeTiers(item.tiers)
      }));
      setLocalItems([...newItems]);
    }
  }, [items]);

  const renderEdit = (item: Item) => {
    dispatch(setModalDataAction({
      'data': {
        item,
        'modalTitle': 'Edit Item'
      },
      'type': modalTypes.EDIT_ITEM_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const renderAdd = () => {
    dispatch(setModalDataAction({
      'data': {
        item: {
          name: '',
          description: '',
          isFixed: true,
          itemType:"",
          productCost:'',
          isJobType: true,
          tax: 0,
          tiers: activeTiers.reduce((total:any, currentValue:any) => ({
            ...total,
            [currentValue.tier._id]: currentValue,
          }), {}),
        },
        'modalTitle': 'New Item'
      },
      'type': modalTypes.ADD_ITEM_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  useEffect(() => {
    if (tiers.length || items) {
      const actions = [
        {
          Cell({ row }: any) {
            return (
              <div className={'flex items-center'}>
                <CSButtonSmall
                  aria-label={'edit'}
                  color={'primary'}
                  onClick={() => renderEdit(row.original)}
                  size={'small'}
                  style={{
                    'marginRight': 10,
                    'minWidth': 35,
                    'padding': '5px 10px',
                  }}>
                  <EditIcon />
                </CSButtonSmall>
              </div>
            );
          },
          'id': 'action',
          'sortable': false,
          'width': 60
        }
      ];
      const dbSync = [
        {
          Cell({ row }: any) {
            return (
              <BCQbSyncStatus data={row.original} />
            );
          },
          'id': 'qbSync',
          'sortable': false,
          'width': 30
        }
      ];


      const columns: any = [
        {
          'Header': 'Name',
          'accessor': 'name',
          'sortable': true,
          'width': 60
        },
        {
          'Header': 'Description',
          'accessor': 'description',
          'sortable': false,
          'width': 100
        },
        {
          Cell({ row }: any) {
            return (
              <div className={'flex items-center'}>
                {row.original.isFixed
                  ? 'Fixed'
                  : 'Hourly'}
              </div>
            );
          },
          'Header': 'Charge Type',
          'accessor': 'isFixed',
          'sortable': true
        },

        {
          Cell({ row }: any) {
            return (
              <div className={'flex items-center'}>
                {row.original.tax
                  ? 'Yes'
                  : 'No'}
              </div>
            );
          },
          'Header': 'Taxable',
          'accessor': 'tax',
          'sortable': true
        }
      ];

      const chargeColumn = [
        {
          Cell({ row }: any) {
            return (
              <p>
                {'$'}
                {row.original.charges}
              </p>
            );
          },
          'Header': 'Charge',
          'accessor': 'charges',
          'sortable': true
        }
      ];
      const tierColumns = activeTiers.map(({ tier }:any) => {
        return {
          Cell({ row }: any) {
            const currentTier = row.original.tiers[tier._id];
            return (
              <>
                {/* <BCInput
                  handleChange={
                    (e:any) => handleTierChange(row.index, e.target.value, currentTier.tier._id)
                  }
                  value={currentTier?.charge || 0}
                /> */}
                {!editMode
                  ? currentTier?.charge
                  : <BCDebouncedInput
                    error={!currentTier?.charge}
                    id={tier._id + tier.name}
                    setValue={(val:string) => handleTierChange(row.original._id, val, currentTier?.tier._id)}
                    value={currentTier?.charge}
                  />}

              </>
            );
          },
          'Header': `Tier ${tier.name} Price`,
          'accessor': tier.name
        };
      }) || [];

      let constructedColumns:any = [
        ...columns,
        ...chargeColumn,
        ...actions,
        ...dbSync,
      ];


      if (tiers.length > 0) {
        constructedColumns = [
          ...columns,
          ...tierColumns,
          ...actions,
          ...dbSync,
        ];
      }
      setColumns(constructedColumns);
    }
  }, [tiers, editMode]);


  useEffect(() => {
    dispatch(loadInvoiceItems.fetch());
    dispatch(getAllSalesTaxAPI());
    localStorage.setItem('nestedRouteKey', 'items');
  }, []);

  return (
    <MainContainer>
      <BCBackButton
        link={'/main/admin/invoicing'}
      />
      <PageContainer>
        <BCTableContainer
          columns={columns}
          isLoading={loading || tiersLoading}
          isPageSaveEnabled
          search
          searchPlaceholder={'Search Items'}
          tableData={localItems}
          toolbar={Toolbar()}
        />
      </PageContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;
  a {
     width: 30px;
     margin-top: 30px;
     margin-left: 30px;
   }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
`;


export default withStyles(styles, { 'withTheme': true })(AdminInvoicingItemsPage);
