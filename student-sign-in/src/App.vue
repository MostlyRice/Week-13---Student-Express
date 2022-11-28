<template>
  <div id="app">
    
    <h1>Student Sign In</h1>

    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </StudentTable>
    <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

export default {
  name: 'app',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
        // this.students is the vue data
        // students is students that is returned from the API
      }).catch( err => {
        console.error('Error getting most recent student list', err.response)
        alert('Sorry, unable to fetch stuent list')
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      }).catch ( err => {
        console.log('Error fetching student list', err)
        
        // if data is returned from the server-- it's an array
        if (err.response.data && Array.isArray(err.response.data)) {
          let msg = err.response.data.join(',')
          alert('Error adding student\n' + msg)
        } else {
          // something else wrong-- display generic error
          console.error('Error adding student', err.response)
          alert('Sorry, unable to add student')
        }
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( err => {
        console.error('Error updating student', err.response)
        alert('Unable to update student')
      })
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {} // clear welcome/goodbye message
      }).catch( err => {
        console.error('Error deleting student', err.response)
        alert('Unable to delete student')

      })
    }
  }
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>