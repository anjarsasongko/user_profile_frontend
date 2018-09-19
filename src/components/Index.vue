<template>
  <div class="container">
    <div class="card">
      <div class="row card-body">
        <div class="col-3 text-center">
          <!-- <img src="http://placehold.it/200x200" alt="" class="img-rounded img-responsive" /> -->
          <img :src="'http://localhost:3000/images/'+user.image" alt="" class="img-rounded img-responsive" />
        </div>
        <div class="col-4 text-left">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h3 v-show="!edit"><label>Name :</label> {{user.name}}</h3>
              <input type="text" v-model="userEdit.name" v-show="edit" placeholder="Full Name">
              <label><small>ID : {{user.id}}</small></label>
            </li>
            <li class="list-group-item pb-0">
              <p v-show="!edit">
                Email : {{user.email}}
              </p>
              <input type="email" v-model="userEdit.email" v-show="edit" placeholder="Email Address">
            </li>
            <li class="list-group-item pb-0">
              <h5 v-show="!edit">
                <cite :title="user.address">
                  {{user.address}}
                </cite>
                <hr class="sm">
                <label><small>Position (ltd, lng): {{user.latitude}}, {{user.longitude}}</small></label>
              </h5>
              <textarea class="textarea" v-model="userEdit.address" v-show="edit" placeholder="Address"></textarea>
              <input type="text" v-model="userEdit.latitude" v-show="edit" placeholder="Longitude">
              <input type="text" v-model="userEdit.longitude" v-show="edit" placeholder="Latitude">
            </li>
            <li class="list-group-item pb-0">
              <p v-show="!edit">
                Telephone : {{user.telephone}}
              </p>
              <input type="email" v-model="userEdit.telephone" v-show="edit" placeholder="Email Address">
            </li>
          </ul>
          <button type="button" class="btn btn-md btn-danger" @click="logout" v-show="!edit">
            Log Out
          </button>
          <button type="button" class="btn btn-md btn-primary" @click="editProfile()" v-show="!edit">
            Edit
          </button>
          <button type="button" class="btn btn-secondary btn-block" @click="submitProfile()" v-show="edit">
            Upload
          </button>
          <button type="button" class="btn btn-danger btn-block" @click="editProfile()" v-show="edit">
            Cancel
          </button>
          <!-- {{user}} -->
        </div>
        <div class="col-5">
          <!-- here the maps -->
          <GmapMap
            :center="center"
            :zoom="15"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="changePotition"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>


<script>
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
import { getHeader, getUser, userURL } from "../config";

export default {
  data() {
    return {
      userEdit:{ 
        id: getUser().user.id,
        name: 'username',
        email: 'mail@mailserver.com',
        email_verified: '2018-09-18T16:20:50.000Z',
        telephone: '+087653124',
        address: '1600 Amphitheatre Parkway, Mountain View, CA, 94043',
        longitude: '-122.083739',
        latitude: '37.423021',
        image: 'image.png'
      },
      edit: false,
      center: {lat: -6.991666, lng: 110.412941},
      markers: [
          {position: {lat: -6.991666, lng: 110.412941}}
      ],
      description: '',
      latLng: {},
      place: null
    };
  },
  created() {
    this.$store.dispatch("getUserProfile");
  },
  computed: {
    ...mapState({
      userData: state => state.user.user
    }),
    user() {
      if(this.userData) {
        this.userEdit = this.userData
        this.markers[0].position.lat = parseFloat(this.userData.latitude)
        this.markers[0].position.lng = parseFloat(this.userData.longitude)
        this.center.lat = parseFloat(this.userData.latitude)
        this.center.lng = parseFloat(this.userData.longitude)
      }
      return this.userEdit;
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    getUser() {
      this.$store.dispatch("getUserProfile")
    },
    editProfile() {
      if (this.edit) {
        this.edit = false;
      } else {
        this.edit = true;
      }
    },
    submitProfile () {
      this.$store.dispatch("updateUserProfile", this.userEdit).then(()=>{
        this.$store.dispatch("getUserProfile");
        this.edit = false
      });
    },
    changePotition() {
      alert('hay')
    }
  }
};
</script>

