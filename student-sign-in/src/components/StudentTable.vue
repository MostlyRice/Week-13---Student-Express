<template>
    <div>
        <!-- Template/HTML here -->
        <div class="card student-list m-2 p-2">
            <h4 class="card-title">Student List</h4>

            <div class="edit-table-toggle form-check">
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table</label>
            </div>

            <div id="student-table">
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>StarID</th>
                        <th>Present?</th>
                        <th v-show="editTable">Delete</th>
                    </tr>

                    <student-row 
                        v-for="student in students" 
                        v-bind:student="student" v-bind:key="student.starID"
                        v-bind:edit="editTable"
                        v-on:student-arrived-or-left="arrivedOrLeft"
                        v-on:delete-student="studentDeleted">
                    </student-row>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import StudentRow from '@/components/StudentRow.vue'

export default {
    // create component here
    name: 'StudentTable',
    components: {
        StudentRow
    },
    emits: ['student-arrived-or-left', 'delete-student'], 
    props: {
        students: Array
    },
    data() {
        return {
           editTable: false 
        }
    },
    methods: {
        arrivedOrLeft(student, present) {
            // TODO emit message to parent
            this.$emit('student-arrived-or-left', student, present)
        },
        studentDeleted(student) {
            this.$emit('delete-student', student)
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

#student-list {
    max-height: 400px;
    overflow: scroll;
}
</style>
