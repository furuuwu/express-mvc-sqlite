<script>
    import { onMount } from "svelte";
    import StudentList from "../components/StudentList.svelte";

    let students = [];

    async function loadStudents() {
        const res = await fetch("http://localhost:3000/api/v1/students");
        if (res.ok) {
            students = await res.json();
        }
    }

    onMount(() => {
        loadStudents();
    });

    async function handleDeleteStudent(id) {
        const res = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            loadStudents();
        }
    }
</script>

<h1>Students</h1>
<StudentList {students} deleteStudent={handleDeleteStudent} />
