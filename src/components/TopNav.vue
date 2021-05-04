<template>
    <!-- top nav -->
    <nav class="z-depth-0 light-blue">
        <!--flattens with no drop shadown -->
        <div class="nav-wrapper container">
            <span class="">
                <a href="/">
                    <img id="superScheduler" src="@/assets/ss512.png" alt="Brand logo" /> <!-- https://fontmeme.com/permalink/210310/960c0fd5d504c2dc3e7598aac9f537d6.png --> 
                </a>
            </span>
            <a href="/"><span>Scheduler</span></a> <!-- just '/' goes to the index directory-->
            <!-- title  -->
            <a class="right grey-text text-darken-1">
                <!--positions span to right of nav -->
                <i class="material-icons more-pages sidenav-trigger" data-target="side-menu">menu</i>
                <!-- i tag to display burger icon -->
            </a>
        </div>
    </nav>
</template>