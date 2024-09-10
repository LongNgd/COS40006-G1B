<template>
    <div class="container-fluid bg-black">
        <nav class="navbar navbar-expand-lg custom_nav-container ">
            <img alt="Vue logo" src="@/assets/swinburne.png" width="120" height="60" />

            <div class="d-flex ml-auto align-items-center">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item ">
                        <RouterLink class="nav-link" to="/project">Project</RouterLink>
                    </li>
                    <!-- <template >
                        <span>Hello</span>
                        <li class="nav-item">
                            <a class="nav-link" @click="logout">Logout</a>
                        </li>
                    </template> -->
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/login">Login</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/register">Register</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>