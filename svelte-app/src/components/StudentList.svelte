<!--
<script>
    import { onMount } from "svelte";
    import { readable, writable } from "svelte/store";

    export let students = [];
    export let deleteStudent;

    onMount(async () => {
        const res = await fetch("http://localhost:3000/api/v1/students");
        if (res.ok) {
            students = await res.json();
        }
    });
</script>

<ul>
    {#each students as student}
        <li>
            {student.name}

            <p>
                {student.age}, {student.email}
            </p>
        </li>
        <button on:click={() => deleteStudent(student.id)}>Delete</button>
    {/each}
</ul>
-->
<script>
    import { onMount } from "svelte";

    let students = [];
    let newStudentName = "";
    let newStudentEmail = "";
    let editStudent = null;
    let studentsAndClasses = [];

    async function loadStudents() {
        const res = await fetch("http://localhost:3000/api/v1/students");
        if (res.ok) {
            students = await res.json();
        }
    }

    async function loadStudentsAndClasses() {
        const res = await fetch(
            "http://localhost:3000/api/v1/getStudentsWithClasses",
        );
        if (res.ok) {
            studentsAndClasses = await res.json();
        }
    }

    onMount(() => {
        loadStudents();
        loadStudentsAndClasses();
    });

    async function handleDeleteStudent(id) {
        const res = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            loadStudents();
        }
    }

    async function addStudent() {
        const res = await fetch("http://localhost:3000/api/v1/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newStudentName,
                email: newStudentEmail,
            }),
        });
        if (res.ok) {
            const newStudent = await res.json();
            students = [...students, newStudent];
            newStudentName = "";
        }
    }

    async function updateStudent() {
        const res = await fetch(
            `http://localhost:3000/api/v1/students/${editStudent.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: editStudent.name,
                    email: editStudent.email,
                    age: editStudent.age,
                    dob: editStudent.dob,
                }),
            },
        );
        if (res.ok) {
            const updatedStudent = await res.json();
            students = students.map((s) =>
                s.id === editStudent.id ? updatedStudent : s,
            );
            editStudent = null;
        }
    }

    function startEditStudent(student) {
        editStudent = { ...student };
    }

    function cancelEdit() {
        editStudent = null;
    }
</script>

<input type="text" bind:value={newStudentName} placeholder="New student name" />
<input type="email" bind:value={newStudentEmail} placeholder="email..." />
<button on:click={addStudent}>Add Student</button>

<ul>
    {#each students as s}
        <li>
            {s.name} ({s.email}) - Age: {s.age} - DOB: {s.dob}
            <button on:click={() => startEditStudent(s)}>Edit</button>
            <button on:click={() => handleDeleteStudent(s.id)}>Delete</button>
        </li>
    {/each}
</ul>

{#if editStudent}
    <form on:submit|preventDefault={updateStudent}>
        <h2>Edit Student</h2>
        <label>
            Name:
            <input type="text" bind:value={editStudent.name} />
        </label>
        <label>
            Email:
            <input type="email" bind:value={editStudent.email} />
        </label>
        <label>
            Age:
            <input type="number" bind:value={editStudent.age} />
        </label>
        <label>
            DOB:
            <input type="date" bind:value={editStudent.dob} />
        </label>
        <button type="submit">Update</button>
        <button type="button" on:click={cancelEdit}>Cancel</button>
    </form>
{/if}

<h1>Students and Classes</h1>

<ul>
    {#each studentsAndClasses as student}
        <li>
            <strong>{student.student_name}</strong>
            {#if student.class_ids && student.class_names}
                <ul>
                    {#each student.class_names.split(",") as class_name}
                        <li>{class_name}</li>
                    {/each}
                </ul>
            {:else}
                <p>No classes enrolled</p>
            {/if}
        </li>
    {/each}
</ul>
