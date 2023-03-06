<template>
  <div>
    <div class="h__form_left">
      <div class="h__form_basic">
        <div class="h__form_group row">
          <label class="col-3" for="name">Name:</label>
          <div class="col-9">
            <input type="text"
                   class="form-control h__form_control d-inline-block"
                   v-model.trim="courseStore.name"
                   :maxlength="MAX_LENGTH_NAME">
            <span class="hf__count_i">{{ getLength(courseStore.name) }}/30</span>
          </div>
        </div>
        <div class="h__form_group row">
          <label class="col-3" for="email">Image:</label>
          <div class="col-9">
            <input type="text" class="form-control h__form_control" v-model.trim="courseStore.image">
          </div>
        </div>
        <div class="h__form_group row">
          <label class="col-3" for="description">Description:</label>
          <div class="col-9">
                  <textarea type="text"
                            class="form-control h__form_control d-inline-block"
                            v-model.trim="courseStore.description"
                            :maxlength="MAX_LENGTH_DESCRIPTION"></textarea>
            <span class="hf__count_i">{{ getLength(courseStore.description) }}/1500</span>
          </div>
        </div>
        <div class="h__form_group row">
          <label class="col-3" for="image">Cost:</label>
          <div class="col-9">
            <input type="text" class="form-control h__form_control" v-model.trim="courseStore.cost">
          </div>
        </div>

        <div class="h__form_group row">
          <label class="col-3" for="website">estimationTime:</label>
          <div class="col-9">
            <input type="text" class="form-control h__form_control" v-model.trim="courseStore.estimationTime">
          </div>
        </div>
      </div>
    </div>
    <button class="button is-success" type="button" @click="storeCourse">{{ getTitle() }}</button>
  </div>
</template>

<script setup>
import {useCourseStore} from "@/stores/courseStore";
import {EVENT_CREATE_CONSTANT, EVENT_UPDATE_CONSTANT, MAX_LENGTH_DESCRIPTION, MAX_LENGTH_NAME} from "@/common/constant";
import {useRoute} from "vue-router";
import CourseService from "@/services/courseService";
import {useAlertStore} from "@/stores/alertStore";
import {router} from "@/router";

const courseStore = useCourseStore();
const alertStore = useAlertStore();
const { storeId, courseId } = useRoute().params;

courseStore.reset()
const getLength = value => value ? value.length : 0;
const getTitle = () => courseId ? EVENT_UPDATE_CONSTANT : EVENT_CREATE_CONSTANT;

const createCourse = async () => {
  const res = await CourseService.create(storeId, {
    name: courseStore.name,
    image: courseStore.image,
    description: courseStore.description,
    cost: courseStore.cost,
    estimationTime: courseStore.estimationTime
  });
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    await router.push({
      name: 'store.course'
    });
    alertStore.success(res.message);
  }
}
const updateCourse = async () => {
  const res = await CourseService.update(storeId, courseId, {
    name: courseStore.name,
    image: courseStore.image,
    description: courseStore.description,
    cost: courseStore.cost,
    estimationTime: courseStore.estimationTime
  });
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    await router.push({
      name: 'store.course'
    });
    alertStore.success(res.message);
  }
}
const getCourse = async (id) => {
  const res = await CourseService.get(storeId, id);
  if (typeof res === 'string') {
    alertStore.error(res);
  } else {
    const {data} = res;
    courseStore.set(data);
  }
}
const storeCourse = () => {
  if(courseId){
    updateCourse();
  }else{
    createCourse();
  }
}

if(courseId){
  getCourse(courseId)
}
</script>

<style scoped>

</style>