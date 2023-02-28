export const compCodeAction = (code) => {
  return {
    type: "COMP_CODE",
    value: code
  }
}

export const compInfoAction = (item) => {
  return {
    type: 'COMPANY_INFO',
    payload: item
  }
}

// export const selectedCompanyAction = (item) => {
//   return {
//     type: 'SELECTED_COMPANY',
//     payload: item
//   }
// }

export const quickViewModalAction = (status) => {
  return {
    type: "LOGIN_MODAL",
    value: status
  }
}

export const loginStatusAction = (status) => {
  return {
    type: "LOGIN",
    value: status
  }
}

export const bookingModalAction = (modalStatus) => {
  return {
    type: "BOOKING_MODAL",
    value: modalStatus
  }
}

export const loaderAction = (status) => {
  return {
    type: 'LOADING',
    value: status
  }
}

export const userInfoAction = (item) => {
  return {
    type: 'USER_INFO',
    payload: item
  }
}

export const breadCrumbAction = (item) => {
  return {
    type: 'BREADCRUMB_DATA',
    payload: item
  }
}

export const addLabTestCartAction = (item) => {
  return {
    type: 'ADD_LAB_TEST',
    payload: {
      item: item,
    }
  }
}

export const removeLabTestCartAction = (id) => {
  return {
    type: 'REMOVE_LAB_TEST',
    payload: id
  }
}

export const dumpLabTestCartAction = () => {
  return {
    type: 'DUMP_ALL_LAB_TEST_CART_ITEMS',
  }
}

export const addPharmacyCartAction = (item) => {
  return {
    type: 'ADD_PHARMACY_CART_ITEM',
    payload: {
      item: item,
    }
  }
}

export const removePharmacyCartAction = (id) => {
  return {
    type: 'REMOVE_PHARMACY_CART_ITEM',
    payload: id
  }
}

export const dumpPharmacyCartAction = () => {
  return {
    type: 'DUMP_ALL_PHARMACY_CART_ITEMS',
  }
}

export const toastAction = (status, item) => {
  return {
    type: 'SHOW_TOAST',
    payload: {
      status: status,
      item: item
    }
  }
}

