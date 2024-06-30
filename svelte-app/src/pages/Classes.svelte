<script>
    import { onMount } from "svelte";
    import ClassList from "../components/ClassList.svelte";

    let classes = [];

    async function loadClasses() {
        const res = await fetch("http://localhost:3000/api/v1/classes");
        if (res.ok) {
            classes = await res.json();
        }
    }

    onMount(() => {
        loadClasses();
    });

    async function handleDeleteClass(id) {
        const res = await fetch(`http://localhost:3000/api/v1/classes/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            loadClasses();
        }
    }
</script>

<h1>Classes</h1>
<ClassList {classes} deleteClass={handleDeleteClass} />
