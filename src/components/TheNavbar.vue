<template>
  <b-row
    align-h="between"
    style="
      background-color: #48d1cc;
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      font-family: Georgia;
    "
  >
    <b-col cols="10">
      <b-navbar>
        <b-navbar-nav>
          <b-navbar-brand tag="h1" class="mx-5 my-1 text-white">
            ToDock
          </b-navbar-brand>
        </b-navbar-nav>
      </b-navbar>
    </b-col>

    <b-col cols="2">
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item-dropdown>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<style>
a:focus-visible {
  box-shadow: none !important;
}
a[role="button"] {
  color: white;
}
a[role="button"]:focus {
  color: white;
}
</style>