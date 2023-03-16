<template>
  <div>
    <body>
      <no-account>
 <DataTable ></DataTable>
      </no-account>
     

</body>

  </div>
  
</template>

<script>
import DataTable from 'datatables.net-dt';
import noAccount from  '../Employees/noAccount.vue'
export default {
     name:'manageCustomers',
    components: {
    DataTable,
    noAccount
  },
  

}
</script>

<style>
 
</style>
