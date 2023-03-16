<template>
<div>
<!-- Modal -->
<div class="modal fade" id="depositModal" tabindex="-1" aria-labelledby="depositModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deposit</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <!-- iban dropdown -->
          
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle block" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Choose IBAN
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Iban1</a></li>
                <li><a class="dropdown-item" href="#">Iban2</a></li>
                <li><a class="dropdown-item" href="#">Iban3</a></li>
            </ul>
            </div>
                 <!-- amount -->
            <br/>
             <label>Enter a deposit amount:</label>
            <div class="input-group">
            <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
            <span class="input-group-text">$</span>
            <span class="input-group-text">0.00</span>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Deposit</button>
      </div>
    </div>
  </div>
</div>
</div>
  
</template>

<script>
export default {
name:'depositModal',
}
</script>

<style>

</style>