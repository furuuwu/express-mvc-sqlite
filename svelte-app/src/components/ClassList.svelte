<!--
<script>
    import { onMount } from "svelte";
    import { readable, writable } from "svelte/store";

    export let classes = [];
    export let deleteClass;

    onMount(async () => {
        const res = await fetch("http://localhost:3000/api/v1/classes");
        if (res.ok) {
            classes = await res.json();
        }
    });
</script>

<ul>
    {#each classes as c}
        <li>
            {c.name}
            <button on:click={() => deleteClass(c.id)}>Delete</button>
        </li>
    {/each}
</ul>
-->
<script>
    import { onMount } from "svelte";
    import { readable, writable } from "svelte/store";

    export let classes = [];
    export let deleteClass;

    let newClassName = "";
    let editClassId = null;
    let editClassName = "";

    onMount(async () => {
        const res = await fetch("http://localhost:3000/api/v1/classes");
        if (res.ok) {
            classes = await res.json();
        }
    });

    async function addClass() {
        const res = await fetch("http://localhost:3000/api/v1/classes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newClassName }),
        });
        if (res.ok) {
            const newClass = await res.json();
            classes = [...classes, newClass];
            newClassName = "";
        }
    }

    async function updateClass() {
        const res = await fetch(
            `http://localhost:3000/api/v1/classes/${editClassId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: editClassName }),
            },
        );
        if (res.ok) {
            const updatedClass = await res.json();
            classes = classes.map((c) =>
                c.id === editClassId ? updatedClass : c,
            );
            editClassId = null;
            editClassName = "";
        }
    }

    function startEditClass(classToEdit) {
        editClassId = classToEdit.id;
        editClassName = classToEdit.name;
    }
</script>

<input type="text" bind:value={newClassName} placeholder="New class name" />
<button on:click={addClass}>Add Class</button>

<ul>
    {#each classes as c}
        <li>
            {#if editClassId === c.id}
                <input type="text" bind:value={editClassName} />
                <button on:click={updateClass}>Update</button>
                <button
                    on:click={() => {
                        editClassId = null;
                        editClassName = "";
                    }}>Cancel</button
                >
            {:else}
                {c.name}
                <button on:click={() => startEditClass(c)}>Edit</button>
                <button on:click={() => deleteClass(c.id)}>Delete</button>
            {/if}
        </li>
    {/each}
</ul>
