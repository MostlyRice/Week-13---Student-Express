<template> 
    <tr v-bind:class=" { present: student.present, absent: !student.present } ">
        <!-- student is the name of the vue data property (in the app) -->
        <td>{{ student.name }}</td>
        <td>{{ student.starID }}</td>
        <td> <input type="checkbox" v-bind:checked="student.present" v-on:change="arrivedOrLeft(student, $event.srcElement.checked)"></td> 
         <td v-show="edit"> 
            <img v-on:click="deleteStudent" src="@/assets/delete.png"> </td> <!-- @ symbol shortcut for src directory -->
     </tr> 
</template>

<script>
export default {
    name: 'StudentRow',
    emits: ['student-arriaved-or-left', 'delete-student'],
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        arrivedOrLeft(student, present) {
            this.$emit('student-arrived-or-left', student, present)
        },
        deleteStudent() {
            if (confirm(`Delete ${this.student.name}?`)) {
              this.$emit('delete-student', this.student)  
            }    
        }
    }

}

</script>

<style scoped>

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

/* set icon height */
img {
    height: 35px;
}

</style>
