<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Auction Details</h4>
            </template>

            <div class="card">
              <div class="card-header">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <router-link 
                      :to="{name: 'auction-general', params: { ... $route.params } }" 
                      class="nav-link">Data</router-link>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <router-view/>
              </div>
            </div>
                        
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

