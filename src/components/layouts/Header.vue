<template>
  <nav class="navbar navbar-expand-lg bg-light h__main_header">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style>
  .h__main_header{
    margin-left: 250px;
  }
</style>