<template>
  <q-dialog persistent :maximized="$q.screen.lt.sm" :value="modalCourse">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{ courseData.name}}
          </q-toolbar-title>
          <q-btn icon="close" class="float-right" color="white" round flat dense @click="$emit('close')" />
        </q-toolbar>
      </q-header>

      <q-footer  class="bg-grey-2 text-primary">
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn label="Fechar" class="float-right" color="primary" flat dense @click="$emit('close')" />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <q-page-container>
        <q-page>
          <q-card class="full-width no-shadow" :key="courseData.id">
            <q-card-section class="q-pa-none">
              <div class="text-body2 text-grey-9 q-mb-md text-center" v-if="courseData.image_url">
                <q-img :src="courseData.image_url" :style="$q.screen.lt.sm ? '' : 'width: 300px'">
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                </q-img>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-sm">
              <q-btn
                v-if="canShare"
                dense
                label="Compartilhar"
                icon="mdi-share-variant-outline"
                @click="shareApp"
                class="full-width"
                color="blue"
              />
            </q-card-section>

            <q-card-section>
              <div class="text-body2 text-grey-9" v-if="courseData.description">
                <p v-html="courseData.description">
                  {{ courseData.description }}
                </p>
              </div>

              <div class="text-body2 text-grey-9">
                <strong>DATA:</strong> {{ formatDateString(courseData.start_date)}} - {{ formatHourString(courseData.start_date) }}
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'DialogCourseDetails',
  props: {
    modalCourse: {
      type: Boolean,
      required: true,
      default: () => false
    },
    courseData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      course: {},
      category: [],
      canShare: false
    }
  },
  async mounted () {
    if (!navigator.canShare) {
      this.canShare = false
    } else {
      this.canShare = true
    }
  },
  methods: {
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },
    formatHourString (dateOriginal) {
      return date.formatDate(dateOriginal, 'HH:mm')
    },
    async shareApp () {
      const shareData = {
        title: 'Veja esse Evento no Abaet??Fest',
        text: this.courseData.name,
        url: window.location.origin + '/#/event-details/' + this.courseData.id
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$notifyDanger('N??o foi poss??vel compartilharo app!')
      }
    }
  }
}
</script>
