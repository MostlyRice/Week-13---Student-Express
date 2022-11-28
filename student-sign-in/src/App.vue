<template>
  <div id="app">
    <h1 id="app-header">Reformated Student Sign-in Form</h1>
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table 
      v-bind:students="students"
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

export default {
  name: 'App',  
    components: {
    NewStudentForm,
    StudentTable,
    StudentMessage,

  },
  data() {
    return {
      students: [
        { name: 'A. Student', 'starID': 'aa1234bb', present: true },
        { name: 'B. Student', 'starID': 'cc4567dd', present: false },
        { name: 'C. Student', 'starID': 'ee8910ff', present: false },
      ],
      mostRecentStudent: {}
    }
  },

  methods: {
    newStudentAdded(student) {
        this.students.push(student)
        this.students.sort(function(s1, s2) {
          return s1.name.toLowerCase() < s2.name.toLowerCase() ? -1 : 1
        })
    },
    studentArrivedOrLeft(student, present) {
      // find student in this.students, set prsent value
      let updateStudent = this.students.find( function(s) {
        if (s.name === student.name && s.starID === student.starID) {
          // this is the student to update
          return true
        }
      })

      if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },
  // },  // close curly brace needs to be moved
  studentDeleted(student) {  
    // filter will check every student in the students array -- another method that could be used here: splice
    this.students = this.students.filter( function(s) {
      if (s != student) {
        return true
      }
    })

    // clear welcome/goodbye message
    this.mostRecentStudent = {}
  }
  }   // end of methods. 
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#app-header{
  text-align: center;
}
</style>
