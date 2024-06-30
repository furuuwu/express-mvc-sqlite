<script>
	import { Router, Route, Link } from "svelte-routing";
	import Students from "./pages/Students.svelte";
	import Classes from "./pages/Classes.svelte";
	import NotFound from "./components/NotFound.svelte";
</script>

<Router>
	<Students path="students" />
	<Classes path="classes" />
</Router>
