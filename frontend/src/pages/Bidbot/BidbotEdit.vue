<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Bid Bot Details</h4>
            </template>

            <div class="card">
              <div class="card-header">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <router-link 
                      :to="{name: 'bidbot-general'}" 
                      class="nav-link">Bot</router-link>
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

